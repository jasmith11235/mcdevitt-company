interface Office {
  slug: string
  city: string
  address: string
  phone: string
}

export default function Offices({ offices }: { offices: Office[] }) {
  return (
    <section id="offices" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-stone-50" />
      <div className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: "url('/graphics/worldmap.jpg')" }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="fade-in mb-16">
          <div className="accent-rule mb-6" />
          <h2 className="font-sans text-xs tracking-[0.3em] uppercase text-[#3D9B82] mb-4">Offices</h2>
          <p className="text-2xl md:text-3xl font-sans font-light leading-tight tracking-tight text-[#1D2B45]">
            Nine offices providing integrated national and international coverage.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-12">
          {offices.map((office, i) => (
            <div key={office.slug} className="fade-in" style={{ transitionDelay: `${i * 80}ms` }}>
              <h3 className="font-sans text-sm tracking-widest uppercase text-[#1D2B45] mb-3">{office.city}</h3>
              <p className="text-sm text-[#1D2B45]/70 leading-relaxed whitespace-pre-line mb-2">{office.address}</p>
              <a href={`tel:${office.phone.replace(/\./g, '')}`} className="font-sans text-xs tracking-wider text-[#3D9B82] hover:text-[#1D2B45] transition-colors duration-300">
                {office.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
