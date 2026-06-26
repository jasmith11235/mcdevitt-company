'use client'

import { useEffect, useState } from 'react'

interface HeroProps {
  tagline: string
  subtitle?: string
}

interface Slide {
  id: string
  label: string
}

const SLIDES: Slide[] = [
  { id: '01_Rock-Center', label: 'Rockefeller Center' },
  { id: '02_Savannah', label: 'Savannah' },
  { id: '03_Terrain-Interior', label: 'Terrain' },
  { id: '04_ALO-Brooklyn', label: 'Alo, Brooklyn' },
  { id: '05_AN-Regent-Interior', label: 'Anthropologie, Regent Street' },
  { id: '06_UO-Madrid', label: 'Urban Outfitters, Madrid' },
  { id: '07_UO-Charleston', label: 'Urban Outfitters, Charleston' },
  { id: '08_Outerknown', label: 'Outerknown' },
]

const SKETCH_HOLD = 1500
const WIPE = 1800
const PHOTO_HOLD = 3200

export default function Hero({ tagline, subtitle }: HeroProps) {
  const [index, setIndex] = useState(0)
  const [entered, setEntered] = useState(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    setEntered(false)
    setRevealed(false)

    const enter = window.setTimeout(() => setEntered(true), 40)
    const reveal = window.setTimeout(() => setRevealed(true), SKETCH_HOLD)
    const advance = window.setTimeout(
      () => setIndex(i => (i + 1) % SLIDES.length),
      SKETCH_HOLD + WIPE + PHOTO_HOLD,
    )

    return () => {
      window.clearTimeout(enter)
      window.clearTimeout(reveal)
      window.clearTimeout(advance)
    }
  }, [index])

  const slide = SLIDES[index]
  const nextSlide = SLIDES[(index + 1) % SLIDES.length]
  const photo = (s: Slide) => `/images/hero/photos/${s.id}.jpg`
  const sketch = (s: Slide) => `/images/hero/sketches/${s.id}.svg`

  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-cream md:h-[82vh]">
      <div
        key={slide.id}
        className={`absolute inset-0 transition-opacity duration-700 ${entered ? 'opacity-100' : 'opacity-0'}`}
      >
        <img
          src={photo(slide)}
          alt={slide.label}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-cream transition-[clip-path] ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{
            transitionDuration: `${WIPE}ms`,
            clipPath: revealed ? 'inset(0 0 0 100%)' : 'inset(0 0 0 0)',
          }}
        >
          <img src={sketch(slide)} alt="" aria-hidden className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/45" />

      <div className="absolute inset-0 z-10 flex items-center justify-center px-10 text-center">
        <h1
          className="font-gotham text-[clamp(32px,5vw,56px)] font-bold uppercase leading-[1.1] tracking-[3px] text-white"
          style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}
        >
          {tagline}
        </h1>
      </div>

      {subtitle ? (
        <p
          className="absolute inset-x-0 bottom-[18%] z-10 px-10 text-center font-mercury text-base italic text-white/90"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.45)' }}
        >
          {subtitle}
        </p>
      ) : null}

      <span className="absolute bottom-5 right-6 z-10 font-gotham text-[9px] font-medium uppercase tracking-[2px] text-white/45">
        {slide.label}
      </span>

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((s, i) => (
          <span
            key={s.id}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index ? 'w-6 bg-white/80' : 'w-2 bg-white/35'
            }`}
          />
        ))}
      </div>

      <link rel="preload" as="image" href={photo(nextSlide)} />
    </section>
  )
}
