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
    <section id="news" className="relative py-24 md:py-32 bg-stone-50 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-[0.03] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: "url('/graphics/woodblock-8.jpg')" }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="fade-in mb-16">
          <div className="accent-rule mb-6" />
          <h2 className="font-sans text-xs tracking-[0.3em] uppercase text-[#3D9B82] mb-4">{t('eyebrow')}</h2>
          <p className="text-2xl md:text-3xl font-sans font-light leading-tight tracking-tight text-[#1D2B45] max-w-2xl">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <article key={item.slug} className="fade-in group">
              <div className="border-t-[3px] border-[#3D9B82] pt-6 transition-colors duration-500 group-hover:border-[#1D2B45]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-[#3D9B82]">
                    {t.has(`categories.${item.category}`) ? t(`categories.${item.category}`) : item.category}
                  </span>
                  <span className="text-[#1D2B45]/30">|</span>
                  <span className="font-sans text-[10px] tracking-wider text-[#1D2B45]/50">{item.source}</span>
                </div>
                <time className="block font-sans text-[10px] tracking-wider text-[#1D2B45]/40 mb-3">
                  {new Date(item.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <h3 className="font-sans text-lg font-medium text-[#1D2B45] mb-3 group-hover:text-[#3D9B82] transition-colors duration-300">
                  {item.externalUrl ? (
                    <a href={item.externalUrl} target="_blank" rel="noopener noreferrer">{item.title}</a>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="text-sm text-[#1D2B45]/70 leading-relaxed">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
        {limit && news.length > limit && (
          <div className="fade-in mt-12 text-center">
            <TransitionLink
              href="/news"
              className="group inline-flex items-center font-sans text-xs tracking-[0.2em] uppercase text-[#3D9B82] border border-[#3D9B82] px-8 py-3 hover:bg-[#3D9B82] hover:text-white transition-colors duration-300"
            >
              <span>{t('allNews')}</span>
              <span aria-hidden className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </TransitionLink>
          </div>
        )}
      </div>
    </section>
  )
}
