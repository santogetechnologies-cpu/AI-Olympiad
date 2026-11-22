// ─────────────────────────────────────────────────────────────────────────────
// POLYFILLS — loaded before anything else in main.tsx
// Ensures compatibility with older browsers (Chrome ≤109 / Windows 7)
// ─────────────────────────────────────────────────────────────────────────────

// Promise.withResolvers — added in Chrome 119, Firefox 121, Safari 17.4
// Required by pdfjs-dist; not available in Chrome ≤109 (Windows 7 max version)
if (typeof (Promise as any).withResolvers !== 'function') {
  (Promise as any).withResolvers = function <T>() {
    let resolve!: (value: T | PromiseLike<T>) => void
    let reject!: (reason?: unknown) => void
    const promise = new Promise<T>((res, rej) => {
      resolve = res
      reject = rej
    })
    return { promise, resolve, reject }
  }
}
