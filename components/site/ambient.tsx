'use client'

import { useEffect, useRef } from 'react'

// The animated background: a slow field of gold nodes that link when they drift close,
// brighten near the pointer and shift with scroll. Fixed behind every page.
export function Ambient() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const LINK = 150
    let w = 0, h = 0, raf = 0
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = []
    const pointer = { x: -9999, y: -9999 }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth; h = window.innerHeight
      canvas!.width = w * dpr; canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      // ponytail: O(n²) link pass; n is capped at 80 so ~3k pair checks per frame.
      const n = Math.max(28, Math.min(80, Math.round((w * h) / 17000)))
      nodes = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12, r: Math.random() * 1.2 + 0.4 }))
    }

    function frame() {
      const shift = (window.scrollY * 0.06) % h
      ctx!.clearRect(0, 0, w, h)
      for (const p of nodes) {
        if (!still) { p.x += p.vx; p.y += p.vy }
        if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20
      }
      const ys = nodes.map((p) => ((p.y - shift) % h + h) % h)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i], ay = ys[i]
        const near = Math.max(0, 1 - Math.hypot(a.x - pointer.x, ay - pointer.y) / 220)
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = a.x - nodes[j].x, dy = ay - ys[j]
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d > LINK) continue
          ctx!.strokeStyle = `rgba(201,164,92,${(1 - d / LINK) * (0.16 + near * 0.4)})`
          ctx!.lineWidth = 0.6
          ctx!.beginPath(); ctx!.moveTo(a.x, ay); ctx!.lineTo(nodes[j].x, ys[j]); ctx!.stroke()
        }
        ctx!.fillStyle = `rgba(232,213,166,${0.35 + near * 0.6})`
        ctx!.beginPath(); ctx!.arc(a.x, ay, a.r + near * 1.2, 0, Math.PI * 2); ctx!.fill()
      }
      if (!still) raf = requestAnimationFrame(frame)
    }

    const move = (e: PointerEvent) => { pointer.x = e.clientX; pointer.y = e.clientY }
    const leave = () => { pointer.x = pointer.y = -9999 }
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden) frame() }
    const onResize = () => { resize(); if (still) frame() }

    resize(); frame()
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    document.addEventListener('visibilitychange', vis)
    if (still) window.addEventListener('scroll', frame, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      document.removeEventListener('visibilitychange', vis)
      window.removeEventListener('scroll', frame)
    }
  }, [])

  return <canvas ref={ref} className="ambient" aria-hidden="true" />
}
