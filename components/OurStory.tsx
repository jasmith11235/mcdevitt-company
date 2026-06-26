import { useTranslations } from 'next-intl'
import TransitionLink from './TransitionLink'

interface OurStoryProps {
  heading: string
  intro: string
  mission: string
}

export default function OurStory({ heading, intro, mission }: OurStoryProps) {
  const t = useTranslations('ourStory')

  return (
    <section id="our-story" className="section-wrap bg-cream">
      <div className="section-inner">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-[60px]">
          <div className="fade-in">
            <div className="section-label">{heading}</div>
            <div className="divider" />
            <p className="mb-4 font-mercury text-[15px] leading-[1.65] text-navy">{intro}</p>
            <p className="mb-6 font-mercury text-[15px] leading-[1.65] text-navy">{mission}</p>
            <TransitionLink href="/#services" className="text-link">
              {t('learnMore')}
            </TransitionLink>
          </div>

          <figure className="fade-in">
            <img
              src="/images/hero/photos/03_Terrain-Interior.jpg"
              alt="A light-filled, plant-rich retail gathering environment"
              className="aspect-[4/3] w-full rounded-[5px] object-cover shadow-photo"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
