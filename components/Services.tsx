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

  const cards = [
    { title: props.tenantRepTitle, desc: props.tenantRepDescription, href: '/practice/tenants', photo: '/photos/practice-tenants.png' },
    { title: props.landlordRepTitle, desc: props.landlordRepDescription, href: '/practice/landlords', photo: '/photos/practice-landlords.jpg' },
    { title: props.capitalMarketsTitle, desc: props.capitalMarketsDescription, href: '/practice/capital', photo: '/photos/practice-capital.png' },
    { title: props.developmentTitle, desc: props.developmentDescription, href: '/practice/development', photo: '/photos/practice-development.png' },
  ]

  return (
    <section id="services" className="section-wrap bg-cream pt-20">
      <div className="section-inner">
        <div className="section-label fade-in">{props.heading}</div>
        <div className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <ServiceCard key={i} {...card} exploreLabel={t('explore')} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  title: string
  desc: string
  href: string
  photo: string
  exploreLabel: string
}

function ServiceCard({ title, desc, href, photo, exploreLabel }: ServiceCardProps) {
  return (
    <TransitionLink
      href={href}
      className="fade-in group flex h-full flex-col overflow-hidden rounded-[5px] bg-white shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-[3px] hover:shadow-photo"
    >
      <img src={photo} alt={title} className="h-[140px] w-full object-cover" />
      <div className="flex flex-1 flex-col border-t-4 border-green p-5">
        <h3 className="mb-2 font-gotham text-[12px] font-bold uppercase tracking-[2px] text-navy">{title}</h3>
        <p className="font-mercury text-[13px] leading-[1.6] text-navy">{desc}</p>
        <span className="mt-auto inline-flex items-center pt-4 font-gotham text-[10px] font-bold uppercase tracking-[0.2em] text-green">
          {exploreLabel}
          <span aria-hidden className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </span>
      </div>
    </TransitionLink>
  )
}
