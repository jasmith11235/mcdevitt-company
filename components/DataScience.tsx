import { useTranslations } from 'next-intl'

interface DataScienceProps {
  heading: string
  intro: string
  proprietaryIntro: string
}

const CAPABILITY_KEYS = ['tapestry', 'pos', 'households', 'performance', 'coTenancy', 'trips'] as const

export default function DataScience({ heading, intro }: DataScienceProps) {
  const t = useTranslations('dataScience.capabilities')
  const capabilities = CAPABILITY_KEYS.map(key => ({
    title: t(`${key}.title`),
    desc: t(`${key}.desc`),
  }))

  return (
    <section id="data-science" className="section-wrap bg-cream pt-20">
      <div className="section-inner">
        <div className="section-label fade-in">{heading}</div>
        <p className="fade-in mb-10 max-w-[680px] font-mercury text-[16px] leading-[1.75] text-navy">{intro}</p>
        <div className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="fade-in rounded-[5px] bg-white p-7 shadow-elevated transition-[transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:shadow-photo"
            >
              <h3 className="mb-3 font-gotham text-[13px] font-bold uppercase leading-[1.3] tracking-[2px] text-navy">{cap.title}</h3>
              <p className="font-mercury text-[13px] leading-[1.6] text-navy">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
