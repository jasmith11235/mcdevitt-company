import Image from 'next/image'
import { useTranslations } from 'next-intl'
import TransitionLink from './TransitionLink'
import WoodblockDivider from './WoodblockDivider'

interface Section {
  heading: string
  body: string
}

interface CriteriaGroup {
  heading: string
  items: string[]
}

interface FeaturedAsset {
  title: string
  location?: string
  assetType?: string
  body: string
  photo?: string
}

interface PracticeCase {
  title: string
  location?: string
  year?: string
  narrative: string
}

interface PracticeQuote {
  quote: string
  name: string
  role: string
}

export interface PracticeContent {
  heroLine: string
  heroCaption?: string
  heroPhoto?: string
  lead: string
  sections?: Section[]
  criteriaHeading?: string
  criteria?: CriteriaGroup[]
  featured?: FeaturedAsset
  caseStudies?: PracticeCase[]
  roster?: string[]
  quote?: PracticeQuote
  intelTeaser?: string
}

/** Per-practice accent so each deep page reads as its own chapter. */
const ACCENTS: Record<string, string> = {
  tenants: '#3D9B82',
  landlords: '#3D9B82',
  development: '#7C4257',
}

/** Brand print used to break the text after the lead, one per practice. */
const PRINTS: Record<string, string> = {
  tenants: '/graphics/woodblock-3.jpg',
  landlords: '/graphics/woodblock-4.jpg',
  development: '/graphics/woodblock-7.jpg',
}

const NAVY = '#1D2B45'

export default function PracticePage({ slug, content }: { slug: string; content: PracticeContent }) {
  const t = useTranslations('practice')
  const p = useTranslations(`practice.${slug}`)
  const accent = ACCENTS[slug] ?? '#3D9B82'
  const walled = slug === 'development'

  return (
    <article>
      <Hero
        content={content}
        eyebrow={p('eyebrow')}
        backLabel={t('back')}
        accent={accent}
        walledNote={walled ? p('walledNote') : undefined}
      />

      {/* Lead — magazine spread */}
      <section className="bg-white pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="fade-in text-2xl md:text-3xl font-sans font-light leading-tight tracking-tight" style={{ color: NAVY }}>
            {content.lead}
          </p>
        </div>
      </section>

      <WoodblockDivider src={PRINTS[slug] ?? '/graphics/woodblock-1.jpg'} />

      {content.sections && content.sections.length > 0 && (
        <Approach sections={content.sections} accent={accent} />
      )}

      {content.criteria && content.criteria.length > 0 && (
        <Criteria heading={content.criteriaHeading ?? ''} groups={content.criteria} accent={accent} />
      )}

      {content.featured && (
        <Featured asset={content.featured} eyebrow={t('common.featuredHeading')} accent={accent} />
      )}

      {content.caseStudies && content.caseStudies.length > 0 && (
        <CaseStudies heading={t('common.caseStudiesHeading')} cases={content.caseStudies} accent={accent} />
      )}

      {content.roster && (
        <Roster
          heading={t('common.rosterHeading')}
          names={content.roster}
          pending={t('common.rosterPending')}
          accent={accent}
        />
      )}

      {content.quote && <Quote quote={content.quote} accent={accent} />}

      {content.intelTeaser && (
        <IntelTeaser teaser={content.intelTeaser} cta={t('common.intelCta')} accent={accent} />
      )}
    </article>
  )
}

function AccentRule({ accent }: { accent: string }) {
  return (
    <div aria-hidden className="mb-6 h-[3px] w-[60px]" style={{ backgroundColor: accent, transform: 'rotate(-0.5deg)' }} />
  )
}

function Hero({
  content,
  eyebrow,
  backLabel,
  accent,
  walledNote,
}: {
  content: PracticeContent
  eyebrow: string
  backLabel: string
  accent: string
  walledNote?: string
}) {
  return (
    <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden pt-32 pb-16" style={{ backgroundColor: NAVY }}>
      {content.heroPhoto ? (
        <>
          <Image src={content.heroPhoto} alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${NAVY}, ${NAVY}b3, ${NAVY}4d)` }} />
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

        <div className="h-[3px] w-[60px] mb-6" style={{ backgroundColor: accent, transform: 'rotate(-0.5deg)' }} />
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-6">
          <p className="font-sans text-xs tracking-[0.3em] uppercase" style={{ color: accent }}>{eyebrow}</p>
          {walledNote && (
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 border-l border-white/20 pl-4">
              {walledNote}
            </span>
          )}
        </div>
        <h1 className="font-sans text-4xl md:text-6xl font-light leading-[1.05] tracking-tight text-white max-w-3xl">
          {content.heroLine}
        </h1>
        {content.heroCaption && (
          <p className="mt-10 font-sans text-[10px] tracking-[0.25em] uppercase text-white/40">{content.heroCaption}</p>
        )}
      </div>
    </section>
  )
}

function Approach({ sections, accent }: { sections: Section[]; accent: string }) {
  return (
    <section className="relative bg-stone-50 py-20 md:py-28 overflow-hidden border-y border-[#1D2B45]/10">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-[0.04] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: "url('/graphics/watercolor-gray.jpg')" }}
      />
      <div className="relative z-10 max-w-5xl mx-auto px-6 space-y-14">
        {sections.map((s, i) => (
          <div key={i} className="fade-in grid md:grid-cols-3 gap-6 md:gap-12">
            <div className="md:col-span-1">
              <div className="h-[3px] w-[40px] mb-4" style={{ backgroundColor: accent, transform: 'rotate(-0.5deg)' }} />
              <h2 className="font-sans text-sm tracking-widest uppercase" style={{ color: NAVY }}>{s.heading}</h2>
            </div>
            <p className="md:col-span-2 text-lg leading-relaxed" style={{ color: `${NAVY}cc` }}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Criteria({ heading, groups, accent }: { heading: string; groups: CriteriaGroup[]; accent: string }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in mb-14">
          <AccentRule accent={accent} />
          <h2 className="text-2xl md:text-3xl font-sans font-light leading-tight tracking-tight" style={{ color: NAVY }}>
            {heading}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
          {groups.map((g, i) => (
            <div key={i} className="fade-in border-t-[3px] pt-6" style={{ borderColor: accent }}>
              <h3 className="font-sans text-xs tracking-[0.25em] uppercase mb-5" style={{ color: accent }}>{g.heading}</h3>
              <ul className="space-y-3">
                {g.items.map(item => (
                  <li key={item} className="flex items-baseline gap-3 text-base" style={{ color: `${NAVY}cc` }}>
                    <span aria-hidden style={{ color: accent }}>&middot;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Featured({ asset, eyebrow, accent }: { asset: FeaturedAsset; eyebrow: string; accent: string }) {
  return (
    <section className="bg-stone-50 py-20 md:py-28 border-y border-[#1D2B45]/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#1D2B45] order-last md:order-first">
            {asset.photo ? (
              <Image src={asset.photo} alt={asset.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            ) : (
              <>
                <Image
                  src="/graphics/watercolor-blue.jpg"
                  alt=""
                  aria-hidden
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                <span className="absolute bottom-4 left-4 font-sans text-[9px] tracking-[0.25em] uppercase text-white/45">
                  Photography to come
                </span>
              </>
            )}
          </div>
          <div>
            <p className="font-sans text-xs tracking-[0.3em] uppercase mb-4" style={{ color: accent }}>{eyebrow}</p>
            <h2 className="text-2xl md:text-3xl font-sans font-light leading-tight tracking-tight mb-3" style={{ color: NAVY }}>
              {asset.title}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-sans text-[10px] tracking-[0.2em] uppercase mb-6" style={{ color: `${NAVY}80` }}>
              {asset.location && <span>{asset.location}</span>}
              {asset.assetType && <span>· {asset.assetType}</span>}
            </div>
            <p className="text-lg leading-relaxed" style={{ color: `${NAVY}cc` }}>{asset.body}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function CaseStudies({ heading, cases, accent }: { heading: string; cases: PracticeCase[]; accent: string }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="fade-in mb-14">
          <AccentRule accent={accent} />
          <h2 className="text-2xl md:text-3xl font-sans font-light leading-tight tracking-tight" style={{ color: NAVY }}>
            {heading}
          </h2>
        </div>
        <div className="space-y-12">
          {cases.map((cs, i) => (
            <div key={i} className="fade-in grid md:grid-cols-5 gap-8 border-t border-[#1D2B45]/10 pt-10">
              <div className="md:col-span-2">
                <h3 className="font-sans text-lg tracking-wide" style={{ color: NAVY }}>{cs.title}</h3>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-sans text-[10px] tracking-[0.2em] uppercase" style={{ color: accent }}>
                  {cs.location && <span>{cs.location}</span>}
                  {cs.year && <span>· {cs.year}</span>}
                </div>
              </div>
              <p className="md:col-span-3 text-lg font-sans font-light leading-relaxed" style={{ color: `${NAVY}cc` }}>
                {cs.narrative}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Roster({ heading, names, pending, accent }: { heading: string; names: string[]; pending: string; accent: string }) {
  return (
    <section className="bg-stone-50 py-20 md:py-28 border-y border-[#1D2B45]/10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="fade-in mb-12">
          <AccentRule accent={accent} />
          <h2 className="text-2xl md:text-3xl font-sans font-light leading-tight tracking-tight" style={{ color: NAVY }}>
            {heading}
          </h2>
        </div>
        {names.length > 0 ? (
          <p className="fade-in text-xl md:text-2xl font-sans font-light leading-relaxed" style={{ color: `${NAVY}cc` }}>
            {names.join(' · ')}
          </p>
        ) : (
          <p className="fade-in font-sans text-sm tracking-wide" style={{ color: `${NAVY}80` }}>
            {pending}
          </p>
        )}
      </div>
    </section>
  )
}

function Quote({ quote, accent }: { quote: PracticeQuote; accent: string }) {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="fade-in max-w-3xl mx-auto px-6">
        <blockquote className="pl-6" style={{ borderLeft: `3px solid ${accent}` }}>
          <p className="text-2xl md:text-3xl font-sans font-light leading-snug" style={{ color: NAVY }}>
            &ldquo;{quote.quote}&rdquo;
          </p>
          <footer className="mt-6">
            <p className="font-sans text-sm tracking-widest uppercase" style={{ color: NAVY }}>{quote.name}</p>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: accent }}>{quote.role}</p>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}

function IntelTeaser({ teaser, cta, accent }: { teaser: string; cta: string; accent: string }) {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden" style={{ backgroundColor: NAVY }}>
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/graphics/woodblock-blue-bg.jpg')" }}
      />
      <div className="fade-in relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-xl md:text-2xl font-sans font-light leading-relaxed text-white mb-8">{teaser}</p>
        <TransitionLink
          href="/#data-science"
          className="group inline-flex items-center font-sans text-xs tracking-[0.2em] uppercase px-8 py-3 border transition-colors duration-300"
          style={{ color: accent, borderColor: accent }}
        >
          <span>{cta}</span>
          <span aria-hidden className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </TransitionLink>
      </div>
    </section>
  )
}
