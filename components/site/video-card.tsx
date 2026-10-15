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
  // Any other card starting playback stops this one (unmounts the YouTube iframe).
  useEffect(() => {
    const stop = () => setPlaying(false)
    window.addEventListener('reel-play', stop)
    return () => window.removeEventListener('reel-play', stop)
  }, [])
  const label = `${item.title}${item.name ? ` — ${item.name}` : ''}`

  if (item.youtube) {
    return (
      <figure className={`reel ${large ? 'reel-lg' : ''}`} data-reveal="clip" data-playing={playing}>
        <div className="reel-frame">
          {playing
            ? <iframe src={`https://www.youtube-nocookie.com/embed/${item.youtube}?autoplay=1&playsinline=1`} title={label} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
            : <>
                <img src={`https://i.ytimg.com/vi/${item.youtube}/hqdefault.jpg`} alt="" loading="lazy" />
                <button className="reel-play" onClick={() => { document.querySelectorAll('video').forEach(v => v.pause()); window.dispatchEvent(new Event('reel-play')); setPlaying(true) }} aria-label={`Play ${label}`}><Play aria-hidden="true" /></button>
              </>}
        </div>
        <figcaption><span>{item.name ?? item.title}</span>{item.role && <small>{item.role}</small>}</figcaption>
      </figure>
    )
  }

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
        <video ref={video} src={item.src} poster={item.poster} preload="none" playsInline controls={playing} onPause={() => setPlaying(false)} onPlay={() => { document.querySelectorAll('video').forEach(v => v !== video.current && v.pause()); window.dispatchEvent(new Event('reel-play')); setPlaying(true) }} aria-label={label} />
        {!playing && (
          <button className="reel-play" onClick={() => video.current?.play()} aria-label={`Play ${label}`}><Play aria-hidden="true" /></button>
        )}
      </div>
      <figcaption><span>{item.name ?? item.title}</span>{item.role && <small>{item.role}</small>}</figcaption>
    </figure>
  )
}
