import { useTranslations } from 'next-intl'
import TransitionLink from './TransitionLink'

interface ServicesProps {
  heading: string
  tenantRepTitle: string
  tenantRepDescription: string
  landlordRepTitle: string
  landlordRepDescription: string
  capitalMarketsTitle: string
  capitalMarketsDescription: string
  developmentTitle: string
  developmentDescription: string
}

export default function Services(props: ServicesProps) {
  const t = useTranslations('services')

  // Order per build spec: Tenant · Landlord · Capital Markets · Development.
  // Each pillar opens its own deep section.
  const cards = [
    { title: props.tenantRepTitle, desc: props.tenantRepDescription, href: '/practice/tenants' },
    { title: props.landlordRepTitle, desc: props.landlordRepDescription, href: '/practice/landlords' },
    { title: props.capitalMarketsTitle, desc: props.capitalMarketsDescription, href: '/practice/capital' },
    { title: props.developmentTitle, desc: props.developmentDescription, href: '/practice/development' },
  ]

  return (
    <section id="services" className="relative py-24 md:py-32 bg-stone-50 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-[0.04] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: "url('/graphics/watercolor-gray.jpg')" }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="fade-in mb-16">
          <div className="accent-rule mb-6" />
          <h2 className="font-sans text-xs tracking-[0.3em] uppercase text-[#3D9B82] mb-4">{props.heading}</h2>
          <p className="text-2xl md:text-3xl font-sans font-light leading-tight tracking-tight text-[#1D2B45] max-w-2xl">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <ServiceCard key={i} title={card.title} desc={card.desc} href={card.href} exploreLabel={t('explore')} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  title: string
  desc: string
  href?: string
  exploreLabel: string
}

function ServiceCard({ title, desc, href, exploreLabel }: ServiceCardProps) {
  const body = (
    <>
      <h3 className="font-sans text-sm tracking-widest uppercase text-[#1D2B45] mb-6">{title}</h3>
      <p className="text-base leading-relaxed text-[#1D2B45]/75">{desc}</p>
      {href && (
        <span className="mt-auto pt-6 inline-flex items-center font-sans text-[10px] tracking-[0.2em] uppercase text-[#3D9B82]">
          <span>{exploreLabel}</span>
          <span aria-hidden className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </span>
      )}
    </>
  )

  const base = 'fade-in relative flex flex-col h-full bg-white border-t-[3px] border-[#3D9B82] p-8 card-lift'

  if (href) {
    return (
      <TransitionLink
        href={href}
        className={`group block ${base} after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[#1D2B45] after:transition-[width] after:duration-500 hover:after:w-full`}
      >
        {body}
      </TransitionLink>
    )
  }

  return <div className={base}>{body}</div>
}
