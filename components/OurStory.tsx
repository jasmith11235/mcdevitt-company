import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface OurStoryProps {
  heading: string
  foundedYear: string
  intro: string
  mission: string
  vision: string
  capabilities: string
}

export default function OurStory({ heading, foundedYear, intro, mission, vision, capabilities }: OurStoryProps) {
  const t = useTranslations('ourStory')
  return (
    <section id="our-story" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in max-w-4xl">
          <div className="accent-rule mb-6" />
          <h2 className="font-sans text-xs tracking-[0.3em] uppercase text-[#3D9B82] mb-4">{heading}</h2>
          <p className="text-3xl md:text-4xl font-sans font-light leading-tight tracking-tight text-[#1D2B45]">
            {t('tagline', { year: foundedYear })}
          </p>
        </div>

        {/* Editorial split: prose left, an evocative environment photo right. */}
        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="fade-in lg:col-span-7 space-y-8 text-lg leading-relaxed text-[#1D2B45]/80">
            <p>{intro}</p>
            <p>{mission}</p>
          </div>
          <figure className="fade-in lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
              <Image
                src="/images/terrain-interior-photo.png"
                alt="A light-filled, plant-rich gathering environment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <figcaption className="mt-3 font-sans text-[10px] tracking-[0.25em] uppercase text-[#1D2B45]/40">
              Compelling retail &amp; gathering environments
            </figcaption>
          </figure>
        </div>

        <div className="fade-in mt-16 max-w-4xl border-l-[3px] border-[#3D9B82] pl-8 py-1">
          <p className="text-xl md:text-2xl font-sans font-light leading-relaxed text-[#1D2B45] italic">
            {vision}
          </p>
        </div>
        <div className="fade-in mt-12 max-w-4xl">
          <p className="text-lg leading-relaxed text-[#1D2B45]/80">{capabilities}</p>
        </div>
      </div>
    </section>
  )
}
