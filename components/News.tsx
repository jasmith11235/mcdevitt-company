import { useTranslations, useLocale } from 'next-intl'
import TransitionLink from './TransitionLink'

interface NewsItem {
  slug: string
  title: string
  source: string
  date: string
  category: string
  summary: string
  image?: string
  externalUrl?: string
}

function CardVisual({ image, label }: { image?: string; label: string }) {
  if (image) {
    return (
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    )
  }
  return (
    <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden bg-navy">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-[0.18]"
        style={{ backgroundImage: "url('/graphics/woodblock-blue-bg.jpg')" }}
      />
      <span className="relative font-gotham text-[11px] font-bold uppercase tracking-[0.3em] text-white/85">
        {label}
      </span>
    </div>
  )
}

export default function News({ news, limit }: { news: NewsItem[]; limit?: number }) {
  const t = useTranslations('news')
  const locale = useLocale()
  const items = limit ? news.slice(0, limit) : news

  return (
    <section id="news" className="section-wrap bg-cream pt-12 md:pt-20">
      <div className="section-inner">
        <div className="section-label fade-in">{t('eyebrow')}</div>
        <div className="grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const categoryLabel = t.has(`categories.${item.category}`)
              ? t(`categories.${item.category}`)
              : item.category
            return (
              <article
                key={item.slug}
                className="fade-in group flex flex-col overflow-hidden rounded-[5px] bg-white shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:shadow-elevated"
              >
                <CardVisual image={item.image} label={categoryLabel} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 font-mercury text-[12px] text-navy/50">{item.source}</div>
                  <h3 className="mb-2 font-gotham text-[13px] font-bold uppercase leading-[1.4] tracking-[1px] text-navy transition-colors duration-300 group-hover:text-green">
                    {item.externalUrl ? (
                      <a href={item.externalUrl} target="_blank" rel="noopener noreferrer">{item.title}</a>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="mb-3 font-mercury text-[13px] leading-[1.6] text-navy/75">{item.summary}</p>
                  <time className="mt-auto font-mercury text-[12px] text-green">
                    {new Date(item.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </div>
              </article>
            )
          })}
        </div>
        {limit && news.length > limit && (
          <div className="fade-in mt-12 text-center">
            <TransitionLink href="/news" className="btn-secondary">
              {t('allNews')}
            </TransitionLink>
          </div>
        )}
      </div>
    </section>
  )
}
