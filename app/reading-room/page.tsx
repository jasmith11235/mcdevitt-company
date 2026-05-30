import type { Metadata } from 'next'
import { getReadingRoom } from '@/lib/content'
import Header from '@/components/Header'
import ReadingRoom from '@/components/ReadingRoom'
import Footer from '@/components/Footer'
import ScrollAnimator from '@/components/ScrollAnimator'

export const metadata: Metadata = {
  title: 'Reading Room | The McDevitt Company',
  description: 'Curated perspectives on the businesses that shape the built environment.',
}

export default function ReadingRoomPage() {
  const items = getReadingRoom()

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
