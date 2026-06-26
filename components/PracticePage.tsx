import Image from 'next/image'
import { useTranslations } from 'next-intl'
import TransitionLink from './TransitionLink'

interface Section {
  heading: string
  body: string
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
  caseStudies?: PracticeCase[]
  roster?: string[]
  quote?: PracticeQuote
}

/** Secondary editorial photo for the overview spread, one per practice. */
const OVERVIEW_PHOTOS: Record<string, string> = {
  tenants: '/images/hero/photos/07_UO-Charleston.jpg',
  landlords: '/images/hero/photos/01_Rock-Center.jpg',
  development: '/images/hero/photos/04_ALO-Brooklyn.jpg',
}

/** Placeholder imagery for featured work until project photography lands. */
const FEATURED_PHOTOS = [
  '/images/hero/photos/05_AN-Regent-Interior.jpg',
  '/images/hero/photos/02_Savannah.jpg',
  '/images/hero/photos/06_UO-Madrid.jpg',
  '/images/hero/photos/08_Outerknown.jpg',
]

export default function PracticePage({ slug, content }: { slug: string; content: PracticeContent }) {
  const t = useTranslations('practice')
  const p = useTranslations(`practice.${slug}`)
  const walled = slug === 'development'

  return (
    <article>
      <Hero
        heroPhoto={content.heroPhoto}
        eyebrow={p('eyebrow')}
        heroLine={content.heroLine}
        backLabel={t('back')}
        walledNote={walled ? p('walledNote') : undefined}
      />

      <Overview eyebrow={p('eyebrow')} lead={content.lead} photo={OVERVIEW_PHOTOS[slug] ?? content.heroPhoto} />

      {content.sections && content.sections.length > 0 && (
        <Approach
          label={t('common.approachLabel')}
          heading={t('common.approachHeading')}
          steps={content.sections}
        />
      )}

      {content.caseStudies && content.caseStudies.length > 0 && (
        <Featured
          label={t('common.selectedWorkLabel')}
          heading={t('common.selectedWorkHeading')}
          cases={content.caseStudies}
        />
      )}

      {content.quote && <Quote quote={content.quote} />}

      {content.roster && content.roster.length > 0 && (
        <Roster heading={t('common.rosterHeading')} names={content.roster} />
      )}

      <Cta text={t('common.ctaText')} button={t('common.ctaButton')} />
    </article>
  )
}

function Hero({
  heroPhoto,
  eyebrow,
  heroLine,
  backLabel,
  walledNote,
}: {
  heroPhoto?: string
  eyebrow: string
  heroLine: string
  backLabel: string
  walledNote?: string
}) {
  return (
    <section className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden">
      {heroPhoto ? (
        <Image src={heroPhoto} alt="" fill priority className="object-cover" sizes="100vw" />
      ) : (
        <div className="absolute inset-0 bg-navy" />
      )}
      <div className="absolute inset-0 bg-black/40" aria-hidden />

      <TransitionLink
        href="/#services"
        className="group absolute left-6 top-28 z-10 inline-flex items-center font-gotham text-[10px] font-medium uppercase tracking-[0.25em] text-white/70 transition-colors duration-300 hover:text-white md:left-10"
      >
        <span aria-hidden className="mr-2 inline-block transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
        {backLabel}
      </TransitionLink>

      <div className="relative z-10 max-w-[800px] px-10 text-center">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span className="font-gotham text-[10px] font-bold uppercase tracking-[3px] text-white/70">{eyebrow}</span>
          {walledNote && (
            <span className="border-l border-white/30 pl-3 font-gotham text-[9px] uppercase tracking-[0.25em] text-white/45">
              {walledNote}
            </span>
          )}
        </div>
        <h1 className="font-gotham text-[clamp(36px,5vw,52px)] font-bold uppercase leading-[1.1] tracking-[3px] text-white">
          {heroLine}
        </h1>
      </div>
    </section>
  )
}

function Overview({ eyebrow, lead, photo }: { eyebrow: string; lead: string; photo?: string }) {
  return (
    <section className="section-wrap bg-cream">
      <div className="section-inner">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-[60px]">
          <div className="fade-in">
            <div className="section-label">{eyebrow}</div>
            <div className="divider" />
            <p className="font-mercury text-[16px] leading-[1.75] text-navy">{lead}</p>
          </div>
          {photo && (
            <figure className="fade-in">
              <img src={photo} alt={eyebrow} className="aspect-[4/3] w-full rounded-[5px] object-cover shadow-photo" />
            </figure>
          )}
        </div>
      </div>
    </section>
  )
}

function Approach({ label, heading, steps }: { label: string; heading: string; steps: Section[] }) {
  const cols = steps.length >= 4 ? 'lg:grid-cols-4' : steps.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
  return (
    <section className="section-wrap bg-white pt-20">
      <div className="section-inner">
        <div className="section-label fade-in">{label}</div>
        <h2 className="section-headline fade-in">{heading}</h2>
        <div className={`mt-12 grid gap-[30px] sm:grid-cols-2 ${cols}`}>
          {steps.map((s, i) => (
            <div
              key={i}
              className="fade-in rounded-[5px] border-t-[3px] border-green bg-white p-8 shadow-elevated transition-[transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:shadow-photo"
            >
              <div className="mb-4 font-gotham text-[36px] font-bold leading-none text-green/25">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="mb-3 font-gotham text-[12px] font-bold uppercase leading-[1.3] tracking-[2px] text-navy">
                {s.heading}
              </h3>
              <p className="font-mercury text-[14px] leading-[1.65] text-navy">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Featured({ label, heading, cases }: { label: string; heading: string; cases: PracticeCase[] }) {
  return (
    <section className="section-wrap bg-cream pt-20">
      <div className="section-inner">
        <div className="section-label fade-in">{label}</div>
        <h2 className="section-headline fade-in">{heading}</h2>
        <div className="mt-12 grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
          {cases.map((cs, i) => (
            <div
              key={i}
              className="fade-in group overflow-hidden rounded-[4px] bg-white shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:shadow-photo"
            >
              <div className="relative h-[280px] overflow-hidden">
                <img
                  src={FEATURED_PHOTOS[i % FEATURED_PHOTOS.length]}
                  alt={cs.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 text-center transition-colors duration-300 group-hover:bg-black/55">
                  <span className="font-gotham text-[14px] font-bold uppercase tracking-[2px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {cs.title}
                  </span>
                  {cs.location && (
                    <span className="mt-1.5 font-mercury text-[12px] italic text-white opacity-0 transition-opacity delay-75 duration-300 group-hover:opacity-100">
                      {cs.location}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5">
                <p className="font-mercury text-[13px] leading-[1.6] text-navy">{cs.narrative}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Quote({ quote }: { quote: PracticeQuote }) {
  return (
    <section className="section-wrap bg-white pt-20">
      <div className="section-inner max-w-[760px]">
        <blockquote className="fade-in border-l-[3px] border-green pl-8">
          <p className="font-mercury text-[24px] italic leading-[1.4] text-navy md:text-[28px]">
            &ldquo;{quote.quote}&rdquo;
          </p>
          <footer className="mt-6">
            <div className="font-gotham text-[11px] font-bold uppercase tracking-[2px] text-navy">{quote.name}</div>
            <div className="mt-1 font-mercury text-[13px] text-navy/70">{quote.role}</div>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}

function Roster({ heading, names }: { heading: string; names: string[] }) {
  return (
    <section className="section-wrap bg-cream pt-20">
      <div className="section-inner">
        <div className="section-label fade-in">{heading}</div>
        <div className="divider" />
        <p className="fade-in font-mercury text-[18px] leading-[1.8] text-navy/80">{names.join(' · ')}</p>
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
