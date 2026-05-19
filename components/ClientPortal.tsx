interface ClientPortalProps {
  heading: string
  description: string
  buttonText: string
  buttonUrl: string
}

export default function ClientPortal({ heading, description, buttonText, buttonUrl }: ClientPortalProps) {
  return (
    <section className="py-20 md:py-24 bg-[#3D9B82]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-sans text-2xl md:text-3xl font-light text-white mb-4">{heading}</h2>
        <p className="text-base text-white/80 mb-8 max-w-xl mx-auto">{description}</p>
        <a
          href={buttonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-sans text-xs tracking-[0.25em] uppercase bg-white text-[#1D2B45] px-10 py-4 hover:bg-[#1D2B45] hover:text-white transition-colors duration-300"
        >
          {buttonText}
        </a>
      </div>
    </section>
  )
}
