// ============================================
// useFadeIn.js — Custom Hook
// Uses IntersectionObserver to detect when
// elements scroll into view and adds the
// 'visible' CSS class to trigger animations.
// ============================================

import { useEffect, useRef } from 'react'

export function useFadeIn(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add 'visible' class — triggers CSS transition
          entry.target.classList.add('visible')

          // Also animate direct children with stagger delay
          const children = entry.target.querySelectorAll('.fade-in-child')
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.1}s`
            child.classList.add('visible')
          })

          // Stop observing once visible (one-time animation)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px',
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return ref
}