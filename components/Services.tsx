interface ServicesProps {
  heading: string
  tenantRepTitle: string
  tenantRepDescription: string
  landlordRepTitle: string
  landlordRepDescription: string
  developmentTitle: string
  developmentDescription: string
}

export default function Services(props: ServicesProps) {
  const cards = [
    { title: props.tenantRepTitle, desc: props.tenantRepDescription },
    { title: props.landlordRepTitle, desc: props.landlordRepDescription },
    { title: props.developmentTitle, desc: props.developmentDescription },
  ]

  return (
    <section id="services" className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in mb-16">
          <div className="accent-rule mb-6" />
          <h2 className="font-sans text-xs tracking-[0.3em] uppercase text-[#3D9B82] mb-4">{props.heading}</h2>
          <p className="text-2xl md:text-3xl font-sans font-light text-[#1D2B45] max-w-2xl">
            Skilled placemakers with the ability to curate compelling merchandising plans with unique and market-relevant leasing vision.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div key={i} className="fade-in bg-white border-t-[3px] border-[#3D9B82] p-8">
              <h3 className="font-sans text-sm tracking-widest uppercase text-[#1D2B45] mb-6">{card.title}</h3>
              <p className="text-base leading-relaxed text-[#1D2B45]/75">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
