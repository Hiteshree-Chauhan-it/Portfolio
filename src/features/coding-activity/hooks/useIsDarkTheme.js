// ============================================================
// hooks/useIsDarkTheme.js
// Detects whether the site is in dark mode by watching the
// `data-theme` attribute on <html>.
//
// This project sets dark mode via:
//   document.documentElement.setAttribute('data-theme', 'dark')
//
// NOT via a `dark` CSS class — that is Tailwind's approach.
// ============================================================

import { useState, useEffect } from 'react'

export function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(
        document.documentElement.getAttribute('data-theme') === 'dark'
      )
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  return isDark
}