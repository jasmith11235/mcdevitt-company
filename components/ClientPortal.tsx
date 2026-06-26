interface ClientPortalProps {
  heading: string
  description: string
  buttonText: string
  buttonUrl: string
}

export default function ClientPortal({ heading, description, buttonText, buttonUrl }: ClientPortalProps) {
  return (
    <section
      id="client-portal"
      className="fade-in border-t border-muted bg-cream px-10 py-[100px] text-center"
    >
      <div className="mx-auto max-w-[600px]">
        <div className="section-label">{heading}</div>
        <p className="mx-auto mb-8 max-w-[600px] font-mercury text-[24px] italic leading-[1.4] text-navy md:text-[28px]">
          {description}
        </p>
        <a href={buttonUrl} target="_blank" rel="noopener" className="btn-primary">
          {buttonText}
        </a>
      </div>
    </section>
  )
}
