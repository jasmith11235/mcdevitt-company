'use client'

import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'

interface HeroProps {
  tagline: string
  subtitle: string
}

interface HeroClip {
  src: string
  startAt?: number
  durationSec: number
}

const CLIPS: HeroClip[] = [
  { src: '/videos/la-sunset.mp4',     durationSec: 10 },
  { src: '/videos/amsterdam.mp4',     durationSec: 7  },
  { src: '/videos/nashville.mp4',     durationSec: 10 },
  { src: '/videos/chicago.mp4',       durationSec: 10, startAt: 25 },
  { src: '/videos/philadelphia.mp4',  durationSec: 10 },
  { src: '/videos/london.mp4',        durationSec: 10 },
]

const CROSSFADE_MS = 1500

export default function Hero({ tagline, subtitle }: HeroProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const active = videoRefs.current[activeIdx]
    const current = CLIPS[activeIdx]

    if (active) {
      if (current.startAt && Math.abs(active.currentTime - current.startAt) > 1) {
        try { active.currentTime = current.startAt } catch {}
      }
      active.play().catch(() => {/* autoplay can be blocked — overlay still works */})
    }
    const nextIdx = (activeIdx + 1) % CLIPS.length
    const upcoming = videoRefs.current[nextIdx]
    if (upcoming && upcoming.preload !== 'auto') {
      upcoming.preload = 'auto'
      upcoming.load()
    }

    const handoff = window.setTimeout(() => {
      setActiveIdx(nextIdx)
    }, current.durationSec * 1000)

    return () => window.clearTimeout(handoff)
  }, [activeIdx])

  return (
    <section className="relative min-h-screen min-h-[100svh] flex flex-col items-center justify-center bg-[#1D2B45] overflow-hidden">
      {CLIPS.map((clip, i) => (
        <video
          key={clip.src}
          ref={el => { videoRefs.current[i] = el }}
          className="hero-video absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out"
          style={{
            opacity: i === activeIdx ? 1 : 0,
            transitionDuration: `${CROSSFADE_MS}ms`,
          }}
          muted
          loop
          playsInline
          preload={i === 0 ? 'auto' : 'metadata'}
          aria-hidden="true"
        >
          <source
            src={clip.startAt ? `${clip.src}#t=${clip.startAt}` : clip.src}
            type="video/mp4"
          />
        </video>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1D2B45]/25 via-[#1D2B45]/5 to-[#1D2B45]/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_center,rgba(29,43,69,0.45)_0%,rgba(29,43,69,0)_100%)]" />

      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: "url('/graphics/woodblock-banner.jpg')" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 hero-text-shadow">
        <Logo color="white" className="w-32 h-32 md:w-48 md:h-48 mb-10 hero-logo-enter" />
        <h1 className="font-sans text-sm md:text-base tracking-[0.3em] uppercase text-white mb-4 hero-text-enter">
          {tagline}
        </h1>
        <p className="font-sans text-xs md:text-sm tracking-widest uppercase text-white/90 max-w-xl hero-text-enter-delay">
          {subtitle}
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hero-scroll-pulse">
        <div className="w-px h-16 bg-white/30 mx-auto mb-2" />
        <span className="font-sans text-[10px] tracking-widest uppercase text-white/40">Scroll</span>
      </div>
    </section>
  )
}
