import { useTranslations } from 'next-intl'
import Logo from './Logo'
import TransitionLink from './TransitionLink'

const footerNavLinks = [
  { key: 'ourStory', href: '/#our-story' },
  { key: 'services', href: '/#services' },
  { key: 'dataScience', href: '/#data-science' },
  { key: 'projects', href: '/#projects' },
  { key: 'news', href: '/news' },
  { key: 'readingRoom', href: '/reading-room' },
  { key: 'offices', href: '/#offices' },
] as const

export default function Footer() {
  const t = useTranslations()
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-[#1D2B45] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          <div>
            <Logo color="white" className="w-20 h-20 mb-6" />
            <p className="font-sans text-xs tracking-wider text-white/50 max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#3D9B82] mb-4">{t('footer.navigate')}</h4>
            <nav className="flex flex-col gap-2">
              {footerNavLinks.map(link => (
                <TransitionLink
                  key={link.key}
                  href={link.href}
                  className="link-underline self-start font-sans text-xs tracking-wider text-white/60 hover:text-white transition-colors duration-300"
                >
                  {t(`nav.${link.key}`)}
                </TransitionLink>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#3D9B82] mb-4">{t('footer.contact')}</h4>
            <a href="mailto:info@mcdevittco.com" className="link-underline font-sans text-xs tracking-wider text-white/60 hover:text-white transition-colors duration-300 inline-block mb-2">
              info@mcdevittco.com
            </a>
            <br />
            <a href="https://mcdevittco.com" className="link-underline font-sans text-xs tracking-wider text-white/60 hover:text-white transition-colors duration-300 inline-block">
              mcdevittco.com
            </a>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:justify-between gap-4">
          <p className="font-sans text-[10px] tracking-wider text-white/30">
            {t('footer.copyright', { year })}
          </p>
          <p className="font-sans text-[10px] tracking-wider text-white/30">
            Philadelphia &middot; Greenwich &middot; Nashville &middot; West Palm Beach &middot; Chicago &middot; Los Angeles &middot; London &middot; Amsterdam
          </p>
        </div>
      </div>
    </footer>
  )
}
