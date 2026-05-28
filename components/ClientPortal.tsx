interface ClientPortalProps {
  heading: string
  description: string
  buttonText: string
  buttonUrl: string
}

export default function ClientPortal({ heading, description, buttonText, buttonUrl }: ClientPortalProps) {
  return (
    <section className="relative py-20 md:py-24 bg-[#3D9B82] overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: "url('/graphics/woodblock-3.jpg')" }} />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-sans text-2xl md:text-3xl font-light text-white mb-4">{heading}</h2>
        <p className="text-base text-white/80 mb-8 max-w-xl mx-auto">{description}</p>
        <a
          href={buttonUrl}
          target="_blank"
          rel="noopener"
          className="inline-block font-sans text-xs tracking-[0.25em] uppercase bg-white text-[#1D2B45] px-10 py-4 hover:bg-[#1D2B45] hover:text-white transition-colors duration-300"
        >
          {buttonText}
        </a>
      </div>
    </section>
  )
}
