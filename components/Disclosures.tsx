import { useTranslations } from 'next-intl'
import { DISCLOSURES } from '@/lib/disclosures'

export default function Disclosures() {
  const t = useTranslations('disclosures')

  return (
    <section className="section-wrap bg-white pt-12 md:pt-20">
      <div className="section-inner max-w-[760px]">
        <div className="fade-in">
          <div className="section-label">{t('eyebrow')}</div>
          <h1 className="font-gotham text-[clamp(1.75rem,4vw,2.25rem)] font-bold uppercase tracking-[0.08em] text-navy">
            {t('heading')}
          </h1>
          <div className="divider" />
          <p className="font-mercury text-[15px] leading-[1.75] text-navy/75">{t('intro')}</p>
        </div>

        <div className="mt-10 space-y-6">
          {DISCLOSURES.map(item => (
            <article
              key={item.state}
              className="fade-in rounded-[5px] border border-muted bg-white p-6 shadow-card md:p-7"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="mb-1 font-gotham text-[9px] font-bold uppercase tracking-[0.25em] text-green">
                    {item.state}
                  </p>
                  <h2 className="font-gotham text-[14px] font-bold uppercase tracking-[0.12em] text-navy">
                    {item.title}
                  </h2>
                  <p className="mt-3 font-mercury text-[14px] leading-[1.65] text-navy/75">
                    {item.description}
                  </p>
                  <p className="mt-2 font-mercury text-[12px] text-navy/45">{item.statute}</p>
                </div>
                <a
                  href={item.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary shrink-0 self-start text-center"
                >
                  {t('viewPdf')}
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="fade-in mt-12 font-mercury text-[12px] leading-[1.7] text-navy/45">{t('legalNote')}</p>
      </div>
    </section>
  )
}
