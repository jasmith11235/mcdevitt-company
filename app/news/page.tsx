import type { Metadata } from 'next'
import { getNews } from '@/lib/content'
import Header from '@/components/Header'
import News from '@/components/News'
import Footer from '@/components/Footer'
import ScrollAnimator from '@/components/ScrollAnimator'

export const metadata: Metadata = {
  title: 'News | The McDevitt Company',
  description: 'Industry news and developments in retail real estate.',
}

export default function NewsPage() {
  const news = getNews()

  return (
    <>
      <Header />
      <main className="pt-24">
        <News news={news} />
      </main>
      <Footer />
      <ScrollAnimator />
    </>
  )
}
