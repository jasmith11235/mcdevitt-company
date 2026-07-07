import { useTranslations } from 'next-intl'
import { getContact } from '@/lib/content'
import Logo from './Logo'
import TransitionLink from './TransitionLink'

const serviceLinks = [
  { labelKey: 'practice.tenants.eyebrow', href: '/practice/tenants' },
  { labelKey: 'practice.landlords.eyebrow', href: '/practice/landlords' },
  { labelKey: 'practice.development.eyebrow', href: '/practice/development' },
  { labelKey: 'practice.capital.eyebrow', href: '/practice/capital' },
] as const

const navigateLinks = [
  { labelKey: 'nav.ourStory', href: '/#our-story' },
  { labelKey: 'nav.projects', href: '/#projects' },
  { labelKey: 'nav.news', href: '/news' },
  { labelKey: 'nav.readingRoom', href: '/reading-room' },
  { labelKey: 'nav.contact', href: '/#contact' },
  { labelKey: 'nav.clientLogin', href: '/#client-portal' },
  { labelKey: 'footer.disclosures', href: '/disclosures' },
] as const

const offices = [
  'Philadelphia',
  'Greenwich',
  'Nashville',
  'Palm Beach',
  'Chicago',
  'Los Angeles',
  'London',
  'Amsterdam',
]

const footerLinkClass =
  'block font-mercury text-[13px] leading-[1.8] text-white/70 transition-colors duration-300 hover:text-white'

const footerHeadingClass =
  'mb-4 font-gotham text-[10px] font-bold tracking-[0.3em] uppercase text-white'

export default function Footer() {
  const t = useTranslations()
  const year = new Date().getFullYear()
  const contact = getContact() as { email?: string; linkedin?: string; instagram?: string } | null

  return (
    <footer id="footer" className="bg-navy px-6 py-[60px] text-white md:px-10">
      <div className="mx-auto max-w-content">
        <div className="mb-10 flex justify-center">
          <Logo color="white" className="h-16 w-16" />
        </div>

        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:text-left">
          <div>
            <p className="mb-3 font-gotham text-[11px] font-bold tracking-[0.25em] uppercase text-white">
              McDevitt
            </p>
            <p className="mx-auto max-w-[15rem] font-mercury text-[13px] italic leading-[1.8] text-white/70 md:mx-0">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className={footerHeadingClass}>{t('nav.services')}</h4>
            {serviceLinks.map(link => (
              <TransitionLink key={link.href} href={link.href} className={footerLinkClass}>
                {t(link.labelKey)}
              </TransitionLink>
            ))}
          </div>

          <div>
            <h4 className={footerHeadingClass}>{t('footer.navigate')}</h4>
            {navigateLinks.map(link => (
              <TransitionLink key={link.href} href={link.href} className={footerLinkClass}>
                {t(link.labelKey)}
              </TransitionLink>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-center">
          {(contact?.linkedin || contact?.instagram) && (
            <div className="flex items-center gap-5">
              {contact.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-white/50 transition-colors duration-300 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
              )}
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-white/50 transition-colors duration-300 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              )}
            </div>
          )}
          <p className="font-mercury text-[11px] text-white/40">
            {t('footer.copyright', { year })}
          </p>
          <p className="font-mercury text-[11px] text-white/30">
            {offices.join(' \u00B7 ')}
          </p>
        </div>
      </div>
    </footer>
  )
}
