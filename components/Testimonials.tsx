import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface Testimonial {
  slug: string
  name: string
  title: string
  company: string
  quote: string
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const t = useTranslations('testimonials')
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in mb-16">
          <div className="accent-rule mb-6" />
          <h2 className="font-sans text-xs tracking-[0.3em] uppercase text-[#3D9B82]">{t('eyebrow')}</h2>
        </div>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* An editorial storefront photo as a quiet vertical anchor beside the words. */}
          <div className="fade-in hidden lg:block lg:col-span-4">
            <div className="relative aspect-[3/4] overflow-hidden lg:sticky lg:top-28 bg-stone-100">
              <Image
                src="/images/anthro-regent-street.jpg"
                alt="Anthropologie flagship, Regent Street, London"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0px, 33vw"
              />
            </div>
          </div>
          <div className="lg:col-span-8 space-y-16">
            {testimonials.map((t) => (
              <div key={t.slug} className="fade-in">
                <div className="pull-quote">
                  <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-[#1D2B45] mb-6 pl-4">
                    {t.quote}
                  </blockquote>
                  <div className="pl-4">
                    <p className="font-sans text-sm font-medium tracking-wider uppercase text-[#1D2B45]">{t.name}</p>
                    <p className="font-sans text-xs tracking-wider text-[#1D2B45]/60 mt-1">{t.title}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
