'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Anything with [data-reveal] gets `.in` once its top passes 88% of the viewport height.
// A position check (not IntersectionObserver) so elements skipped by anchor jumps or fast flings still reveal.
export function Motion() {
  const pathname = usePathname()

  useEffect(() => {
    let pending = [...document.querySelectorAll<HTMLElement>('[data-reveal]:not(.in)')]
    let raf = 0
    const check = () => {
      raf = 0
      const line = window.innerHeight * 0.88
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top > line) return true
        el.classList.add('in')
        return false
      })
      if (!pending.length) window.removeEventListener('scroll', onScroll)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check) }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [pathname])

  return null
}
