import { getHero, getAbout, getServices, getDataScience, getClientPortal, getTestimonials, getProjects, getOffices, getNews } from '@/lib/content'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import OurStory from '@/components/OurStory'
import Services from '@/components/Services'
import DataScience from '@/components/DataScience'
import Projects from '@/components/Projects'
import Testimonials from '@/components/Testimonials'
import ReadingRoom from '@/components/ReadingRoom'
import Offices from '@/components/Offices'
import ClientPortal from '@/components/ClientPortal'
import WoodblockDivider from '@/components/WoodblockDivider'
import Footer from '@/components/Footer'
import ScrollAnimator from '@/components/ScrollAnimator'

export default function Home() {
  const hero = getHero()
  const about = getAbout()
  const services = getServices()
  const dataScience = getDataScience()
  const clientPortal = getClientPortal()
  const testimonials = getTestimonials()
  const projects = getProjects()
  const offices = getOffices()
  const news = getNews()

  return (
    <>
      <Header />
      <main>
        <Hero tagline={hero?.tagline || ''} subtitle={hero?.subtitle || ''} />
        <OurStory {...(about || {})} />
        <WoodblockDivider src="/graphics/woodblock-3.jpg" />
        <Services {...(services || {})} />
        <DataScience {...(dataScience || {})} />
        <WoodblockDivider src="/graphics/woodblock-7.jpg" />
        <Projects projects={projects} />
        <Testimonials testimonials={testimonials} />
        <WoodblockDivider src="/graphics/woodblock-4.jpg" />
        <ReadingRoom news={news} />
        <Offices offices={offices} />
        <ClientPortal {...(clientPortal || { heading: '', description: '', buttonText: '', buttonUrl: '' })} />
        <Footer />
      </main>
      <ScrollAnimator />
    </>
  )
}
