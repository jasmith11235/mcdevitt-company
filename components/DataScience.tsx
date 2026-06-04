import { useTranslations } from 'next-intl'

interface DataScienceProps {
  heading: string
  intro: string
  proprietaryIntro: string
}

const CAPABILITY_KEYS = ['tapestry', 'pos', 'households', 'performance', 'coTenancy', 'trips'] as const

export default function DataScience({ heading, intro, proprietaryIntro }: DataScienceProps) {
  const t = useTranslations('dataScience.capabilities')
  const capabilities = CAPABILITY_KEYS.map(key => ({
    title: t(`${key}.title`),
    desc: t(`${key}.desc`),
  }))
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
