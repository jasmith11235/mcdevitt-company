import Logo from './Logo'

interface HeroProps {
  tagline: string
  subtitle: string
}

export default function Hero({ tagline, subtitle }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#1D2B45] overflow-hidden">
      {/* Woodblock texture overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
        style={{ backgroundImage: "url('/graphics/woodblock-banner.jpg')" }}
      />
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <Logo color="white" className="w-32 h-32 md:w-48 md:h-48 mb-10" />
        <h1 className="font-sans text-sm md:text-base tracking-[0.3em] uppercase text-white mb-4">
          {tagline}
        </h1>
        <p className="font-sans text-xs md:text-sm tracking-widest uppercase text-[#3D9B82] max-w-xl">
          {subtitle}
        </p>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-16 bg-white/30 mx-auto mb-2" />
        <span className="font-sans text-[10px] tracking-widest uppercase text-white/40">Scroll</span>
      </div>
    </section>
  )
}
