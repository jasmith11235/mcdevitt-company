'use client'

import { useState, useEffect } from 'react'
import Logo from './Logo'

interface HeroProps {
  tagline: string
  subtitle: string
}

const heroImages = [
  '/images/anthro-rock-center.jpg',
  '/images/free-people-london.jpg',
  '/images/pastis-nashville.jpg',
  '/images/terrain-bethesda.jpg',
  '/images/simon-pearce.jpg',
]

export default function Hero({ tagline, subtitle }: HeroProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#1D2B45] overflow-hidden">
      {/* Crossfading Ken Burns images */}
      {heroImages.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            i === current ? 'opacity-30' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-[-10%] bg-cover bg-center hero-ken-burns"
            style={{
              backgroundImage: `url('${src}')`,
              animationDelay: `${i * -3}s`,
            }}
          />
        </div>
      ))}
      {/* Color overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1D2B45]/60 via-[#1D2B45]/40 to-[#1D2B45]/80" />
      {/* Woodblock texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.04] mix-blend-overlay"
        style={{ backgroundImage: "url('/graphics/woodblock-banner.jpg')" }}
      />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <Logo color="white" className="w-32 h-32 md:w-48 md:h-48 mb-10 hero-logo-enter" />
        <h1 className="font-sans text-sm md:text-base tracking-[0.3em] uppercase text-white mb-4 hero-text-enter">
          {tagline}
        </h1>
        <p className="font-sans text-xs md:text-sm tracking-widest uppercase text-[#3D9B82] max-w-xl hero-text-enter-delay">
          {subtitle}
        </p>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hero-scroll-pulse">
        <div className="w-px h-16 bg-white/30 mx-auto mb-2" />
        <span className="font-sans text-[10px] tracking-widest uppercase text-white/40">Scroll</span>
      </div>
    </section>
  )
}
