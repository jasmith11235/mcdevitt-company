import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getNews } from '@/lib/content'
import { buildAlternates } from '@/lib/seo'
import type { Locale } from '@/i18n/routing'
import Header from '@/components/Header'
import News from '@/components/News'
import Footer from '@/components/Footer'
import ScrollAnimator from '@/components/ScrollAnimator'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.news' })
  return { title: t('title'), description: t('description'), alternates: buildAlternates(locale, '/news') }
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const news = getNews(locale)

  return (
    <>
      <Header />
      <main className="pt-24 page-enter">
        <News news={news} />
      </main>
      <Footer />
      <ScrollAnimator />
    </>
  )
}
