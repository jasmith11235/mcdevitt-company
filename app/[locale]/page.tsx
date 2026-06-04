import { setRequestLocale } from 'next-intl/server'
import { getHero, getAbout, getServices, getDataScience, getClientPortal, getTestimonials, getProjects, getOffices, getNews, getReadingRoom } from '@/lib/content'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import OurStory from '@/components/OurStory'
import Services from '@/components/Services'
import DataScience from '@/components/DataScience'
import Projects from '@/components/Projects'
import Testimonials from '@/components/Testimonials'
import News from '@/components/News'
import ReadingRoom from '@/components/ReadingRoom'
import Offices from '@/components/Offices'
import ClientPortal from '@/components/ClientPortal'
import WoodblockDivider from '@/components/WoodblockDivider'
import Footer from '@/components/Footer'
import ScrollAnimator from '@/components/ScrollAnimator'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const hero = getHero(locale)
  const about = getAbout(locale)
  const services = getServices(locale)
  const dataScience = getDataScience(locale)
  const clientPortal = getClientPortal(locale)
  const testimonials = getTestimonials(locale)
  const projects = getProjects(locale)
  const offices = getOffices(locale)
  const news = getNews(locale)
  const readingRoom = getReadingRoom(locale)

  return (
    <>
      <Header />
      <main className="page-enter">
        <Hero tagline={hero?.tagline || ''} subtitle={hero?.subtitle || ''} />
        <OurStory {...(about || {})} />
        <WoodblockDivider src="/graphics/woodblock-3.jpg" />
        <Services {...(services || {})} />
        <DataScience {...(dataScience || {})} />
        <WoodblockDivider src="/graphics/woodblock-7.jpg" />
        <Projects projects={projects} />
        <Testimonials testimonials={testimonials} />
        <WoodblockDivider src="/graphics/woodblock-4.jpg" />
        <News news={news} limit={3} />
        <ReadingRoom items={readingRoom} limit={3} />
        <Offices offices={offices} />
        <ClientPortal {...(clientPortal || { heading: '', description: '', buttonText: '', buttonUrl: '' })} />
        <Footer />
      </main>
      <ScrollAnimator />
    </>
  )
}
