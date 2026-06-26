import Image from 'next/image'
import { useTranslations } from 'next-intl'
import TransitionLink from './TransitionLink'

interface Expertise {
  title: string
  body: string
}

interface CaseStudy {
  narrative: string
  vendor?: string
  purchaser?: string
  assets?: string
  lfa?: string
  location?: string
  price?: string
  year?: string
}

interface TeamMember {
  name: string
  title: string
  bio: string
  portrait?: string
}

export interface CapitalMarketsContent {
  heroLine: string
  heroCaption: string
  heroPhoto?: string
  lead: string
  approach: string
  accreditationLogo?: string
  accreditationLogoLight?: string
  segmentsRetail: string[]
  segmentsOther: string[]
  expertise: Expertise[]
  caseStudies: CaseStudy[]
  team: TeamMember[]
  intelTeaser: string
}

export default function CapitalMarkets(content: CapitalMarketsContent) {
  const t = useTranslations('practice')
  const c = useTranslations('practice.capital')

  return (
    <article>
      <Hero content={content} eyebrow={c('eyebrow')} backLabel={t('back')} regulatedLabel={c('ricsRegulated')} />

      <section className="section-wrap bg-cream">
        <div className="section-inner max-w-[760px]">
          <p className="fade-in mb-8 font-mercury text-[18px] leading-[1.75] text-navy">{content.lead}</p>
          <p className="fade-in font-mercury text-[15px] leading-[1.7] text-navy/80">{content.approach}</p>
        </div>
      </section>

      <Accreditation
        logo={content.accreditationLogo}
        caption={c('accreditationCaption')}
        alt={c('accreditationAlt')}
        regulatedLabel={c('ricsRegulated')}
      />

      <Segments
        heading={c('segmentsHeading')}
        retailLabel={c('retailLabel')}
        retail={content.segmentsRetail}
        other={content.segmentsOther}
      />

      <Expertise heading={c('expertiseHeading')} items={content.expertise} />

      <TrackRecord
        heading={c('trackRecordHeading')}
        cases={content.caseStudies}
        labels={{
          vendor: t('caseLabels.vendor'),
          purchaser: t('caseLabels.purchaser'),
          assets: t('caseLabels.assets'),
          lfa: t('caseLabels.lfa'),
          location: t('caseLabels.location'),
          price: t('caseLabels.price'),
          year: t('caseLabels.year'),
        }}
      />

      {content.team.length > 0 && <Team heading={c('teamHeading')} members={content.team} />}

      <Cta text={t('common.ctaText')} button={t('common.ctaButton')} />
    </article>
  )
}

function Hero({
  content,
  eyebrow,
  backLabel,
  regulatedLabel,
}: {
  content: CapitalMarketsContent
  eyebrow: string
  backLabel: string
  regulatedLabel: string
}) {
  return (
    <section className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden">
      {content.heroPhoto ? (
        <Image src={content.heroPhoto} alt="" fill priority className="object-cover" sizes="100vw" />
      ) : (
        <div className="absolute inset-0 bg-navy" />
      )}
      <div className="absolute inset-0 bg-black/45" aria-hidden />

      <TransitionLink
        href="/#services"
        className="group absolute left-6 top-28 z-10 inline-flex items-center font-gotham text-[10px] font-medium uppercase tracking-[0.25em] text-white/70 transition-colors duration-300 hover:text-white md:left-10"
      >
        <span aria-hidden className="mr-2 inline-block transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
        {backLabel}
      </TransitionLink>

      <div className="relative z-10 max-w-[800px] px-10 text-center">
        <div className="mb-4 font-gotham text-[10px] font-bold uppercase tracking-[3px] text-white/70">{eyebrow}</div>
        <h1 className="font-gotham text-[clamp(36px,5vw,52px)] font-bold uppercase leading-[1.1] tracking-[3px] text-white">
          {content.heroLine}
        </h1>
        <div className="mt-10 flex items-center justify-center gap-4">
          <RicsMark logo={content.accreditationLogoLight ?? content.accreditationLogo} regulatedLabel={regulatedLabel} variant="light" />
          {content.heroCaption && (
            <span className="font-gotham text-[9px] uppercase tracking-[0.25em] text-white/45">{content.heroCaption}</span>
          )}
        </div>
      </div>
    </section>
  )
}

function Accreditation({
  logo,
  caption,
  alt,
  regulatedLabel,
}: {
  logo?: string
  caption: string
  alt: string
  regulatedLabel: string
}) {
  return (
    <section className="border-y border-muted bg-cream py-16">
      <div className="fade-in mx-auto flex max-w-content flex-col items-center gap-5 px-10 text-center">
        <RicsMark logo={logo} regulatedLabel={regulatedLabel} variant="dark" alt={alt} />
        <p className="font-gotham text-[10px] uppercase tracking-[0.3em] text-navy/60">{caption}</p>
      </div>
    </section>
  )
}

function RicsMark({
  logo,
  regulatedLabel,
  variant,
  alt,
}: {
  logo?: string
  regulatedLabel: string
  variant: 'light' | 'dark'
  alt?: string
}) {
  if (logo) {
    return (
      <span className="relative inline-block h-10 w-28">
        <Image src={logo} alt={alt ?? regulatedLabel} fill className="object-contain object-left" sizes="112px" />
      </span>
    )
  }

  const border = variant === 'light' ? 'border-white/40 text-white' : 'border-navy/30 text-navy'
  const sub = variant === 'light' ? 'text-white/50' : 'text-navy/50'
  return (
    <span className="inline-flex flex-col items-center" role="img" aria-label={alt ?? regulatedLabel}>
      <span className={`border px-4 py-1.5 font-gotham text-2xl font-bold tracking-[0.35em] ${border}`}>RICS</span>
      <span aria-hidden className={`mt-1.5 font-gotham text-[8px] uppercase tracking-[0.25em] ${sub}`}>
        {regulatedLabel}
      </span>
    </span>
  )
}

function Segments({
  heading,
  retailLabel,
  retail,
  other,
}: {
  heading: string
  retailLabel: string
  retail: string[]
  other: string[]
}) {
  return (
    <section className="section-wrap bg-white pt-20">
      <div className="section-inner max-w-[960px]">
        <h2 className="section-headline fade-in">{heading}</h2>
        <div className="fade-in mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          <div>
            <p className="mb-5 font-gotham text-[11px] font-bold uppercase tracking-[0.25em] text-green">{retailLabel}</p>
            <ul className="space-y-3">
              {retail.map(item => (
                <li key={item} className="flex items-baseline gap-3 font-mercury text-[16px] text-navy/80">
                  <span aria-hidden className="text-green">&middot;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-3">
              {other.map(item => (
                <li
                  key={item}
                  className="border-b border-muted pb-3 font-gotham text-[11px] uppercase tracking-[0.2em] text-navy"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Expertise({ heading, items }: { heading: string; items: Expertise[] }) {
  return (
    <section className="section-wrap bg-cream pt-20">
      <div className="section-inner">
        <h2 className="section-headline fade-in">{heading}</h2>
        <div className="mt-12 grid gap-[30px] md:grid-cols-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="fade-in rounded-[5px] border-t-[3px] border-green bg-white p-8 shadow-elevated transition-[transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:shadow-photo"
            >
              <h3 className="mb-3 font-gotham text-[12px] font-bold uppercase tracking-[2px] text-navy">{item.title}</h3>
              <p className="font-mercury text-[14px] leading-[1.65] text-navy">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface CaseLabels {
  vendor: string
  purchaser: string
  assets: string
  lfa: string
  location: string
  price: string
  year: string
}

function TrackRecord({ heading, cases, labels }: { heading: string; cases: CaseStudy[]; labels: CaseLabels }) {
  return (
    <section className="section-wrap bg-white pt-20">
      <div className="section-inner">
        <h2 className="section-headline fade-in">{heading}</h2>
        <div className="mt-12 space-y-12">
          {cases.map((cs, i) => (
            <div key={i} className="fade-in grid gap-8 border-t border-muted pt-10 md:grid-cols-5">
              <p className="font-mercury text-[18px] leading-[1.6] text-navy md:col-span-2">{cs.narrative}</p>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-5 self-start md:col-span-3">
                <Fact label={labels.vendor} value={cs.vendor} />
                <Fact label={labels.purchaser} value={cs.purchaser} />
                <Fact label={labels.assets} value={cs.assets} />
                <Fact label={labels.lfa} value={cs.lfa} />
                <Fact label={labels.location} value={cs.location} />
                <Fact label={labels.price} value={cs.price} />
                <Fact label={labels.year} value={cs.year} />
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Fact({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div>
      <dt className="mb-1.5 font-gotham text-[9px] uppercase tracking-[0.25em] text-navy/40">{label}</dt>
      <dd className="font-mercury text-[14px] text-navy">{value}</dd>
    </div>
  )
}

function Team({ heading, members }: { heading: string; members: TeamMember[] }) {
  return (
    <section className="section-wrap bg-cream pt-20">
      <div className="section-inner">
        <h2 className="section-headline fade-in">{heading}</h2>
        <div className="mt-12 grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => (
            <div key={i} className="fade-in">
              {m.portrait && (
                <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-[5px] bg-muted/40">
                  <Image src={m.portrait} alt={m.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                </div>
              )}
              <h3 className="font-gotham text-[13px] font-bold uppercase tracking-[2px] text-navy">{m.name}</h3>
              <p className="mb-3 mt-1 font-gotham text-[10px] uppercase tracking-[0.2em] text-green">{m.title}</p>
              <p className="font-mercury text-[14px] leading-[1.6] text-navy/70">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Cta({ text, button }: { text: string; button: string }) {
  return (
    <section className="fade-in border-t border-muted bg-cream px-10 py-[100px] text-center">
      <div className="mx-auto max-w-[600px]">
        <p className="mb-8 font-mercury text-[24px] italic leading-[1.4] text-navy md:text-[28px]">{text}</p>
        <a
          href="#contact"
          className="inline-block rounded-[3px] bg-green px-9 py-3.5 font-gotham text-[10px] font-bold uppercase tracking-[2.5px] text-white transition-colors duration-300 hover:bg-navy"
        >
          {button}
        </a>
      </div>
    </section>
  )
}
