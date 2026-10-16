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

export function usePdfBook({ pdfUrl, initialPage = 1, scale = 1.4 }: UsePdfBookOptions): UsePdfBookResult {
  const [numPages, setNumPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(initialPage)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [pageText, setPageText] = useState<string>('')

  const pdfDocRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null)
  const renderTaskRef = useRef<any>(null)
  const textCacheRef = useRef<Map<number, string>>(new Map())
  const numPagesRef = useRef<number>(0)
  numPagesRef.current = numPages

  // Track initial load only once per pdfUrl
  const loadedUrlRef = useRef<string>('')

  // Load PDF Document
  useEffect(() => {
    let isCancelled = false
    setIsLoading(true)
    setError(null)
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

        if (loadedUrlRef.current !== pdfUrl) {
          loadedUrlRef.current = pdfUrl
          const target = Math.max(1, Math.min(doc.numPages, initialPage))
          setCurrentPage(target)
        }
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

  // Extract text from a page
  const extractPageText = useCallback(async (pageNum: number): Promise<string> => {
    if (!pdfDocRef.current) return ''
    if (textCacheRef.current.has(pageNum)) {
      return textCacheRef.current.get(pageNum)!
    }

    try {
      const page = await pdfDocRef.current.getPage(pageNum)
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
  }, [])

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

  // Render page to canvas at high DPR
  const renderPageToCanvas = useCallback(
    async (canvas: HTMLCanvasElement, pageNum: number, currentScale = scale): Promise<{ width: number; height: number } | null> => {
      if (!pdfDocRef.current) return null

      try {
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel()
          renderTaskRef.current = null
        }

        const page = await pdfDocRef.current.getPage(pageNum)
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const viewport = page.getViewport({ scale: currentScale })

        canvas.style.width = `${viewport.width}px`
        canvas.style.height = `${viewport.height}px`
        canvas.width = Math.floor(viewport.width * dpr)
        canvas.height = Math.floor(viewport.height * dpr)

        const ctx = canvas.getContext('2d')
        if (!ctx) return null

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        const task = page.render({
          canvasContext: ctx,
          viewport: viewport,
        })
        renderTaskRef.current = task
        await task.promise
        renderTaskRef.current = null

        return { width: viewport.width, height: viewport.height }
      } catch (err: any) {
        if (err?.name === 'RenderingCancelledException') return null
        return null
      }
    },
    [scale]
  )

  // Rock-solid navigation functions using function form of setState
  const nextPage = useCallback(() => {
    setCurrentPage((prev) => {
      const maxP = numPagesRef.current || 218
      const n = Math.min(maxP, prev + 1)
      return n
    })
  }, [])

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }, [])

  const goToPage = useCallback((target: number) => {
    const maxP = numPagesRef.current || 218
    setCurrentPage(Math.max(1, Math.min(maxP, target)))
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
