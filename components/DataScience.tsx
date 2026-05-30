interface DataScienceProps {
  heading: string
  intro: string
  proprietaryIntro: string
}

const capabilities = [
  { title: 'Tapestry Segmentation', desc: "ESRI's market-leading psychographic system, dividing the US into 67 unique lifestyle groups." },
  { title: 'Point of Sale Analysis', desc: 'Point of Sale data sets containing millions of observations of consumer behavior.' },
  { title: 'Target Households', desc: "Tapestry groups form the basis of a retailer's or investor's target demographic." },
  { title: 'Sales Performance', desc: 'Advanced analytic techniques make raw data actionable by accounting for economic, demographic, and geographic context.' },
  { title: 'Co-Tenancy Correlations', desc: 'A database of nearly 100,000 individual retail locations to determine co-tenant impact on client sales.' },
  { title: 'Trips Data', desc: 'Start and end point analytics give actual drive times and more accurate volume projections.' },
]

export default function DataScience({ heading, intro, proprietaryIntro }: DataScienceProps) {
  return (
    <section id="data-science" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#1D2B45]" />
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/graphics/woodblock-blue-bg.jpg')" }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="fade-in mb-16">
          <div className="accent-rule mb-6" />
          <h2 className="font-sans text-xs tracking-[0.3em] uppercase text-[#3D9B82] mb-4">{heading}</h2>
          <p className="text-2xl md:text-3xl font-sans font-light leading-tight tracking-tight text-white max-w-3xl mb-6">{intro}</p>
          <p className="text-base text-white/70 max-w-2xl">{proprietaryIntro}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <div key={i} className="fade-in border border-white/15 p-6 card-glow">
              <h3 className="font-sans text-xs tracking-widest uppercase text-[#3D9B82] mb-4">{cap.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
