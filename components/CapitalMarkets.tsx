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

      {/* Lead + approach — magazine spread */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <p className="fade-in text-2xl md:text-3xl font-sans font-light leading-tight tracking-tight text-[#1D2B45] mb-12">
            {content.lead}
          </p>
          <p className="fade-in text-lg leading-relaxed text-[#1D2B45]/80">{content.approach}</p>
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

      <IntelTeaser teaser={content.intelTeaser} cta={c('intelCta')} />
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
    <section className="relative min-h-[70vh] flex flex-col justify-end bg-[#1D2B45] overflow-hidden pt-32 pb-16">
      {content.heroPhoto ? (
        <>
          <Image src={content.heroPhoto} alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D2B45] via-[#1D2B45]/70 to-[#1D2B45]/30" />
        </>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
          style={{ backgroundImage: "url('/graphics/woodblock-blue-bg.jpg')" }}
        />
      )}

      <div className="relative z-10 max-w-6xl mx-auto w-full px-6">
        <TransitionLink
          href="/#services"
          className="group inline-flex items-center font-sans text-[10px] tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors duration-300 mb-10"
        >
          <span aria-hidden className="mr-2 inline-block transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
          <span>{backLabel}</span>
        </TransitionLink>

        <div className="accent-rule mb-6 !bg-[#3D9B82]" />
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#3D9B82] mb-6">{eyebrow}</p>
        <h1 className="font-sans text-4xl md:text-6xl font-light leading-[1.05] tracking-tight text-white max-w-3xl">
          {content.heroLine}
        </h1>

        <div className="mt-12 flex items-center gap-4">
          <RicsMark logo={content.accreditationLogo} regulatedLabel={regulatedLabel} variant="light" />
          {content.heroCaption && (
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/40">
              {content.heroCaption}
            </span>
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
    <section className="bg-stone-50 border-y border-[#1D2B45]/10 py-16">
      <div className="fade-in max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-5">
        <RicsMark logo={logo} regulatedLabel={regulatedLabel} variant="dark" alt={alt} />
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#1D2B45]/60">{caption}</p>
      </div>
    </section>
  )
}

/**
 * RICS credibility mark. Uses the supplied logo asset when one is configured in
 * the CMS; until then it renders a restrained typographic seal so the page is
 * complete and on-brand without a placeholder image.
 */
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

  const border = variant === 'light' ? 'border-white/40 text-white' : 'border-[#1D2B45]/30 text-[#1D2B45]'
  const sub = variant === 'light' ? 'text-white/50' : 'text-[#1D2B45]/50'
  return (
    <span className="inline-flex flex-col items-center" role="img" aria-label={alt ?? regulatedLabel}>
      <span className={`font-sans text-2xl font-light tracking-[0.35em] border px-4 py-1.5 ${border}`}>
        RICS
      </span>
      <span aria-hidden className={`mt-1.5 font-sans text-[8px] tracking-[0.25em] uppercase ${sub}`}>
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
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <div className="fade-in mb-12">
          <div className="accent-rule mb-6" />
          <h2 className="text-2xl md:text-3xl font-sans font-light leading-tight tracking-tight text-[#1D2B45]">
            {heading}
          </h2>
        </div>
        <div className="fade-in grid md:grid-cols-2 gap-x-12 gap-y-10">
          <div>
            <p className="font-sans text-xs tracking-[0.25em] uppercase text-[#3D9B82] mb-5">{retailLabel}</p>
            <ul className="space-y-3">
              {retail.map(item => (
                <li key={item} className="flex items-baseline gap-3 text-lg text-[#1D2B45]/80">
                  <span aria-hidden className="text-[#3D9B82]">&middot;</span>
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
                  className="font-sans text-xs tracking-[0.25em] uppercase text-[#1D2B45] border-b border-[#1D2B45]/10 pb-3"
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
    <section className="relative bg-stone-50 py-20 md:py-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-[0.04] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: "url('/graphics/watercolor-gray.jpg')" }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="fade-in mb-14">
          <div className="accent-rule mb-6" />
          <h2 className="text-2xl md:text-3xl font-sans font-light leading-tight tracking-tight text-[#1D2B45]">
            {heading}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {items.map((item, i) => (
            <div key={i} className="fade-in border-t-[3px] border-[#3D9B82] pt-6">
              <h3 className="font-sans text-sm tracking-widest uppercase text-[#1D2B45] mb-4">{item.title}</h3>
              <p className="text-base leading-relaxed text-[#1D2B45]/75">{item.body}</p>
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
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in mb-14">
          <div className="accent-rule mb-6" />
          <h2 className="text-2xl md:text-3xl font-sans font-light leading-tight tracking-tight text-[#1D2B45]">
            {heading}
          </h2>
        </div>
        <div className="space-y-12">
          {cases.map((cs, i) => (
            <div key={i} className="fade-in grid md:grid-cols-5 gap-8 border-t border-[#1D2B45]/10 pt-10">
              <p className="md:col-span-2 text-xl font-sans font-light leading-relaxed text-[#1D2B45]">
                {cs.narrative}
              </p>
              <dl className="md:col-span-3 grid grid-cols-2 gap-x-8 gap-y-5 self-start">
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
      <dt className="font-sans text-[9px] tracking-[0.25em] uppercase text-[#1D2B45]/40 mb-1.5">{label}</dt>
      <dd className="font-sans text-sm tracking-wide text-[#1D2B45]">{value}</dd>
    </div>
  )
}

function Team({ heading, members }: { heading: string; members: TeamMember[] }) {
  return (
    <section className="bg-stone-50 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in mb-14">
          <div className="accent-rule mb-6" />
          <h2 className="text-2xl md:text-3xl font-sans font-light leading-tight tracking-tight text-[#1D2B45]">
            {heading}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {members.map((m, i) => (
            <div key={i} className="fade-in">
              {m.portrait && (
                <div className="relative aspect-[4/5] mb-5 overflow-hidden bg-stone-100">
                  <Image src={m.portrait} alt={m.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                </div>
              )}
              <h3 className="font-sans text-sm tracking-widest uppercase text-[#1D2B45]">{m.name}</h3>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#3D9B82] mt-1 mb-3">{m.title}</p>
              <p className="text-sm leading-relaxed text-[#1D2B45]/70">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function IntelTeaser({ teaser, cta }: { teaser: string; cta: string }) {
  return (
    <section className="relative bg-[#1D2B45] py-20 md:py-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/graphics/woodblock-blue-bg.jpg')" }}
      />
      <div className="fade-in relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-xl md:text-2xl font-sans font-light leading-relaxed text-white mb-8">{teaser}</p>
        <TransitionLink
          href="/#data-science"
          className="group inline-flex items-center font-sans text-xs tracking-[0.2em] uppercase text-[#3D9B82] border border-[#3D9B82] px-8 py-3 hover:bg-[#3D9B82] hover:text-white transition-colors duration-300"
        >
          <span>{cta}</span>
          <span aria-hidden className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </TransitionLink>
      </div>
    </section>
  )
}
