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
  if (!testimonials?.length) return null

  return (
    <section id="testimonials" className="section-wrap bg-cream">
      <div className="section-inner">
        <div className="section-label fade-in">{t('eyebrow')}</div>
        <div className="grid items-center gap-12 md:grid-cols-[45%_1fr] md:gap-[60px]">
          <figure className="fade-in relative h-[300px] overflow-hidden rounded-[4px] md:h-[400px]">
            <Image
              src="/images/hero/photos/05_AN-Regent-Interior.jpg"
              alt="Anthropologie flagship, Regent Street, London"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </figure>
          <div className="space-y-12">
            {testimonials.map((item) => (
              <blockquote key={item.slug} className="fade-in">
                <p className="mb-6 font-mercury text-[20px] italic leading-[1.5] text-navy md:text-[22px]">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="font-gotham text-[10px] font-bold uppercase tracking-[2px] text-navy">{item.name}</div>
                <div className="mt-1 font-mercury text-[12px] text-navy/70">
                  {item.title}, {item.company}
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
