import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { locales, type Locale } from '@/i18n/routing'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TransitionLink from '@/components/TransitionLink'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'careersThankYou' })
  // The Salesforce return URL is a transactional landing page; keep it out of search.
  return { title: t('metaTitle'), robots: { index: false, follow: false } }
}

export default async function CareersThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'careersThankYou' })

  return (
    <>
      <Header />
      <main className="page-enter">
        <section className="relative min-h-[70vh] flex items-center bg-[#1D2B45] overflow-hidden pt-32 pb-20">
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
            style={{ backgroundImage: "url('/graphics/woodblock-blue-bg.jpg')" }}
          />
          <div className="relative z-10 max-w-3xl mx-auto w-full px-6">
            <div className="accent-rule mb-6 !bg-[#3D9B82]" />
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#3D9B82] mb-6">{t('eyebrow')}</p>
            <h1 className="font-sans text-4xl md:text-5xl font-light leading-[1.1] tracking-tight text-white max-w-2xl">
              {t('heading')}
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-white/70 max-w-xl">{t('body')}</p>
            <TransitionLink
              href="/"
              className="group mt-12 inline-flex items-center font-sans text-xs tracking-[0.2em] uppercase text-[#3D9B82] border border-[#3D9B82] px-8 py-3 hover:bg-[#3D9B82] hover:text-white transition-colors duration-300"
            >
              <span aria-hidden className="mr-2 inline-block transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
              <span>{t('backHome')}</span>
            </TransitionLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
