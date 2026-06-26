import { useTranslations } from 'next-intl'

interface Office {
  slug: string
  city: string
  address: string
  phone: string
}

export default function Offices({ offices }: { offices: Office[] }) {
  const t = useTranslations('offices')
  return (
    <section id="offices" className="section-wrap bg-cream pt-20">
      <div className="section-inner">
        <div className="fade-in mb-12">
          <div className="section-label">{t('eyebrow')}</div>
          <p className="max-w-[680px] font-mercury text-[16px] leading-[1.75] text-navy">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {offices.map((office) => (
            <div key={office.slug} className="fade-in">
              <h3 className="mb-3 font-gotham text-[13px] font-bold uppercase tracking-[2px] text-navy">{office.city}</h3>
              <p className="mb-2 whitespace-pre-line font-mercury text-[13px] leading-[1.6] text-navy/75">{office.address}</p>
              <a
                href={`tel:${office.phone.replace(/\./g, '')}`}
                className="font-mercury text-[13px] text-green transition-colors duration-300 hover:text-navy"
              >
                {office.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
