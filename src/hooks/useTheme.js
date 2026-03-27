// ============================================
// useTheme.js — Custom Hook
// Manages dark/light mode.
// Saves preference to localStorage so it
// persists when the user refreshes the page.
// ============================================

import { useState, useEffect } from 'react'

export function useTheme() {
  // Read saved preference, or default to 'light'
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  )

  useEffect(() => {
    // Apply theme to <html> as a data attribute
    document.documentElement.setAttribute('data-theme', theme)
    // Save to localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggleTheme }
}