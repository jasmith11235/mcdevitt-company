import { useTranslations, useLocale } from 'next-intl'
import TransitionLink from './TransitionLink'

interface NewsItem {
  slug: string
  title: string
  source: string
  date: string
  category: string
  summary: string
  externalUrl?: string
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
          {items.map((item) => (
            <article
              key={item.slug}
              className="fade-in group flex flex-col rounded-[5px] bg-white p-6 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:shadow-elevated"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="font-gotham text-[10px] font-bold uppercase tracking-[0.2em] text-green">
                  {t.has(`categories.${item.category}`) ? t(`categories.${item.category}`) : item.category}
                </span>
                <span className="text-navy/30">|</span>
                <span className="font-mercury text-[12px] text-navy/50">{item.source}</span>
              </div>
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
            </article>
          ))}
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
