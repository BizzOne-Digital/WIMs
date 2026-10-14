'use client'

import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import type { Testimonial } from '@/lib/site'

export function VideoCard({ item, index, large }: { item: Testimonial; index: number; large?: boolean }) {
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  // Pause when scrolled out of view.
  useEffect(() => {
    const el = video.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting) el.pause() })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const label = `${item.title}${item.name ? ` — ${item.name}` : ''}`

  if (!item.src) {
    return (
      <figure className={`reel reel-empty ${large ? 'reel-lg' : ''}`} data-reveal="clip">
        <div className="reel-frame">
          <span className="reel-play" aria-hidden="true"><Play /></span>
        </div>
        <figcaption><span>{item.title}</span><small>Video coming soon</small></figcaption>
      </figure>
    )
  }

  return (
    <figure className={`reel ${large ? 'reel-lg' : ''}`} data-reveal="clip" data-playing={playing}>
      <div className="reel-frame">
        <video ref={video} src={item.src} poster={item.poster} preload="none" playsInline controls={playing} onPause={() => setPlaying(false)} onPlay={() => { document.querySelectorAll('video').forEach(v => v !== video.current && v.pause()); setPlaying(true) }} aria-label={label} />
        {!playing && (
          <button className="reel-play" onClick={() => video.current?.play()} aria-label={`Play ${label}`}><Play aria-hidden="true" /></button>
        )}
      </div>
      <figcaption><span>{item.name ?? item.title}</span>{item.role && <small>{item.role}</small>}</figcaption>
    </figure>
  )
}
