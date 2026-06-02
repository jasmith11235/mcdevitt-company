import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getCapitalMarkets } from '@/lib/content'
import { buildAlternates } from '@/lib/seo'
import type { Locale } from '@/i18n/routing'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollAnimator from '@/components/ScrollAnimator'
import CapitalMarkets, { type CapitalMarketsContent } from '@/components/CapitalMarkets'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'practice.capital' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: buildAlternates(locale, '/practice/capital'),
  }
}

export default async function CapitalMarketsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const content = getCapitalMarkets(locale) as CapitalMarketsContent | null
  if (!content) notFound()

  return (
    <>
      <Header />
      <main className="page-enter">
        <CapitalMarkets {...content} />
      </main>
      <Footer />
      <ScrollAnimator />
    </>
  )
}
