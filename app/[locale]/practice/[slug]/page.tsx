import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getPractice, isPracticeSlug, PRACTICE_SLUGS } from '@/lib/content'
import { buildAlternates } from '@/lib/seo'
import { locales, type Locale } from '@/i18n/routing'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollAnimator from '@/components/ScrollAnimator'
import PracticePage, { type PracticeContent } from '@/components/PracticePage'

export function generateStaticParams() {
  return locales.flatMap(locale => PRACTICE_SLUGS.map(slug => ({ locale, slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isPracticeSlug(slug)) return {}
  const t = await getTranslations({ locale, namespace: `practice.${slug}` })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: buildAlternates(locale, `/practice/${slug}`),
  }
}

export default async function PracticeDeepPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  if (!isPracticeSlug(slug)) notFound()
  const content = getPractice(slug, locale) as PracticeContent | null
  if (!content) notFound()

  return (
    <>
      <Header />
      <main className="page-enter">
        <PracticePage slug={slug} content={content} />
      </main>
      <Footer />
      <ScrollAnimator />
    </>
  )
}
