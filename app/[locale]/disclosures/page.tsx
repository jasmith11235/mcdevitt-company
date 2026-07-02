import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildAlternates } from '@/lib/seo'
import { locales, type Locale } from '@/i18n/routing'
import Header from '@/components/Header'
import Disclosures from '@/components/Disclosures'
import Footer from '@/components/Footer'
import ScrollAnimator from '@/components/ScrollAnimator'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.disclosures' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, '/disclosures'),
  }
}

export default async function DisclosuresPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Header />
      <main className="pt-24 page-enter">
        <Disclosures />
      </main>
      <Footer />
      <ScrollAnimator />
    </>
  )
}
