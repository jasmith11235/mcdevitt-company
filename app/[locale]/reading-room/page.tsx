import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getReadingRoom } from '@/lib/content'
import { buildAlternates } from '@/lib/seo'
import type { Locale } from '@/i18n/routing'
import Header from '@/components/Header'
import ReadingRoom from '@/components/ReadingRoom'
import Footer from '@/components/Footer'
import ScrollAnimator from '@/components/ScrollAnimator'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta.readingRoom' })
  return { title: t('title'), description: t('description'), alternates: buildAlternates(locale, '/reading-room') }
}

export default async function ReadingRoomPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const items = getReadingRoom(locale)

  return (
    <>
      <Header />
      <main className="pt-24 page-enter">
        <ReadingRoom items={items} />
      </main>
      <Footer />
      <ScrollAnimator />
    </>
  )
}
