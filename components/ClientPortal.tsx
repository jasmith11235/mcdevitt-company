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
        <h2 className="font-sans text-2xl md:text-3xl font-light leading-tight tracking-tight text-white mb-4">{heading}</h2>
        <p className="text-base leading-relaxed text-white/80 mb-8 max-w-xl mx-auto">{description}</p>
        <a
          href={buttonUrl}
          target="_blank"
          rel="noopener"
          className="group inline-flex items-center font-sans text-xs tracking-widest uppercase bg-white text-[#1D2B45] px-10 py-4 hover:bg-[#1D2B45] hover:text-white transition-colors duration-300"
        >
          <span>{buttonText}</span>
          <span aria-hidden className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </a>
      </div>
    </section>
  )
}
