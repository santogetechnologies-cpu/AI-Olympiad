// ─────────────────────────────────────────────────────────────────────────────
// USE PDF BOOK HOOK — ULTRA-STABLE PDF.JS ENGINE
// Crisp DPR rendering, prefetching, robust page navigation, and text extraction
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
}

export interface UsePdfBookOptions {
  pdfUrl: string
  initialPage?: number
  scale?: number
  minPage?: number
  maxPage?: number
}

export interface UsePdfBookResult {
  numPages: number
  currentPage: number
  isLoading: boolean
  error: string | null
  pageText: string
  setCurrentPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  goToPage: (page: number) => void
  renderPageToCanvas: (canvas: HTMLCanvasElement, pageNum: number, currentScale?: number) => Promise<{ width: number; height: number } | null>
  extractPageText: (pageNum: number) => Promise<string>
  pdfDoc: pdfjsLib.PDFDocumentProxy | null
}

export function usePdfBook({
  pdfUrl,
  initialPage = 1,
  scale = 1.4,
  minPage = 1,
  maxPage
}: UsePdfBookOptions): UsePdfBookResult {
  const [numPages, setNumPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(initialPage)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [pageText, setPageText] = useState<string>('')

  const pdfDocRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null)
  const renderTaskRef = useRef<any>(null)
  const renderSeqRef = useRef<number>(0)
  const pageCacheRef = useRef<Map<number, any>>(new Map())
  const textCacheRef = useRef<Map<number, string>>(new Map())
  const numPagesRef = useRef<number>(0)
  numPagesRef.current = numPages

  const minPageRef = useRef<number>(minPage || 1)
  minPageRef.current = minPage || 1
  const maxPageRef = useRef<number>(maxPage || 0)
  maxPageRef.current = maxPage || 0

  // Track initial load only once per pdfUrl
  const loadedUrlRef = useRef<string>('')

  const targetPageRef = useRef<number>(initialPage)
  targetPageRef.current = initialPage

  // Load PDF Document
  useEffect(() => {
    let isCancelled = false
    setIsLoading(true)
    setError(null)
    pageCacheRef.current.clear()
    textCacheRef.current.clear()

    const loadingTask = pdfjsLib.getDocument({
      url: pdfUrl,
      rangeChunkSize: 65536,
      disableAutoFetch: false,
    })

    loadingTask.promise
      .then((doc) => {
        if (isCancelled) return
        pdfDocRef.current = doc
        numPagesRef.current = doc.numPages
        setNumPages(doc.numPages)
        setIsLoading(false)

        loadedUrlRef.current = pdfUrl
        const minP = minPageRef.current || 1
        const maxP = maxPageRef.current && maxPageRef.current > 0 ? Math.min(doc.numPages, maxPageRef.current) : doc.numPages
        const desired = targetPageRef.current || initialPage || minP
        const target = Math.max(minP, Math.min(maxP, desired))
        setCurrentPage(target)
      })
      .catch((err) => {
        if (isCancelled) return
        console.error('Failed to load PDF:', err)
        setError(err.message || 'Failed to load PDF book')
        setIsLoading(false)
      })

    return () => {
      isCancelled = true
    }
  }, [pdfUrl])

  // Synchronize when initialPage, minPage, or maxPage changes
  useEffect(() => {
    minPageRef.current = minPage || 1
    maxPageRef.current = maxPage || 0
    const minP = minPage || 1
    const docMax = numPagesRef.current || 218
    const maxP = maxPage && maxPage > 0 ? Math.min(docMax, maxPage) : docMax
    const desired = initialPage || minP
    const target = Math.max(minP, Math.min(maxP, desired))
    targetPageRef.current = target
    setCurrentPage(target)
  }, [initialPage, minPage, maxPage])

  // Cache-enabled page retrieval helper
  const getPageWithCache = useCallback(async (pageNum: number): Promise<any> => {
    if (!pdfDocRef.current) return null
    if (pageCacheRef.current.has(pageNum)) {
      return pageCacheRef.current.get(pageNum)
    }
    const page = await pdfDocRef.current.getPage(pageNum)
    pageCacheRef.current.set(pageNum, page)
    return page
  }, [])

  // Prefetch adjacent pages in background without blocking rendering
  const prefetchAdjacentPages = useCallback((pageNum: number) => {
    if (!pdfDocRef.current) return
    const minP = minPageRef.current || 1
    const docMax = numPagesRef.current || 218
    const maxP = maxPageRef.current && maxPageRef.current > 0 ? Math.min(docMax, maxPageRef.current) : docMax

    // Prefetch next page (highest priority for forward reading)
    const nextP = pageNum + 1
    if (nextP <= maxP && !pageCacheRef.current.has(nextP)) {
      pdfDocRef.current.getPage(nextP).then((p) => {
        pageCacheRef.current.set(nextP, p)
      }).catch(() => {})
    }

    // Prefetch previous page
    const prevP = pageNum - 1
    if (prevP >= minP && !pageCacheRef.current.has(prevP)) {
      pdfDocRef.current.getPage(prevP).then((p) => {
        pageCacheRef.current.set(prevP, p)
      }).catch(() => {})
    }
  }, [])

  // Extract text from a page using cached page proxy
  const extractPageText = useCallback(async (pageNum: number): Promise<string> => {
    if (!pdfDocRef.current) return ''
    if (textCacheRef.current.has(pageNum)) {
      return textCacheRef.current.get(pageNum)!
    }

    try {
      const page = await getPageWithCache(pageNum)
      if (!page) return ''
      const textContent = await page.getTextContent()
      const text = textContent.items
        .map((item: any) => ('str' in item ? item.str : ''))
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()
      textCacheRef.current.set(pageNum, text)
      return text
    } catch (e) {
      return ''
    }
  }, [getPageWithCache])

  // Auto-extract text when currentPage changes
  useEffect(() => {
    if (!pdfDocRef.current || currentPage < 1) return
    let active = true

    extractPageText(currentPage).then((text) => {
      if (active) setPageText(text)
    })

    return () => {
      active = false
    }
  }, [currentPage, extractPageText])

  // Render page to canvas at high DPR with instant caching & cancellation
  const renderPageToCanvas = useCallback(
    async (canvas: HTMLCanvasElement, pageNum: number, currentScale = scale): Promise<{ width: number; height: number } | null> => {
      if (!pdfDocRef.current) return null

      // Cancel any active render task immediately
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel()
        } catch {}
        renderTaskRef.current = null
      }

      const seq = ++renderSeqRef.current

      try {
        const page = await getPageWithCache(pageNum)
        if (!page || seq !== renderSeqRef.current) return null

        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const viewport = page.getViewport({ scale: currentScale })

        canvas.style.width = `${viewport.width}px`
        canvas.style.height = `${viewport.height}px`
        canvas.width = Math.floor(viewport.width * dpr)
        canvas.height = Math.floor(viewport.height * dpr)

        const ctx = canvas.getContext('2d')
        if (!ctx || seq !== renderSeqRef.current) return null

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        const task = page.render({
          canvasContext: ctx,
          viewport: viewport,
        })
        renderTaskRef.current = task
        await task.promise
        if (renderTaskRef.current === task) {
          renderTaskRef.current = null
        }

        if (seq !== renderSeqRef.current) return null

        // Prefetch adjacent pages into memory in the background
        prefetchAdjacentPages(pageNum)

        return { width: viewport.width, height: viewport.height }
      } catch (err: any) {
        if (err?.name === 'RenderingCancelledException') return null
        return null
      }
    },
    [scale, getPageWithCache, prefetchAdjacentPages]
  )

  // Rock-solid navigation functions strictly bounded within [minPage, maxPage]
  const nextPage = useCallback(() => {
    setCurrentPage((prev) => {
      const minP = minPageRef.current || 1
      const docMax = numPagesRef.current || 218
      const maxP = maxPageRef.current && maxPageRef.current > 0 ? Math.min(docMax, maxPageRef.current) : docMax
      const n = Math.min(maxP, Math.max(minP, prev + 1))
      return n
    })
  }, [])

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => {
      const minP = minPageRef.current || 1
      return Math.max(minP, prev - 1)
    })
  }, [])

  const goToPage = useCallback((target: number) => {
    const minP = minPageRef.current || 1
    const docMax = numPagesRef.current || 218
    const maxP = maxPageRef.current && maxPageRef.current > 0 ? Math.min(docMax, maxPageRef.current) : docMax
    setCurrentPage(Math.max(minP, Math.min(maxP, target)))
  }, [])

  return {
    numPages,
    currentPage,
    isLoading,
    error,
    pageText,
    setCurrentPage,
    nextPage,
    prevPage,
    goToPage,
    renderPageToCanvas,
    extractPageText,
    pdfDoc: pdfDocRef.current
  }
}
