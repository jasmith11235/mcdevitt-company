'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Logo from './Logo'
import TransitionLink from './TransitionLink'
import LanguageSwitcher from './LanguageSwitcher'

const leftLinks = [
  { key: 'ourStory', href: '/#our-story' },
  { key: 'services', href: '/#services' },
  { key: 'projects', href: '/#projects' },
] as const

const rightLinks = [
  { key: 'news', href: '/news' },
  { key: 'readingRoom', href: '/reading-room' },
  { key: 'contact', href: '/#contact' },
] as const

const mobileLinks = [
  { key: 'home', href: '/' },
  ...leftLinks,
  ...rightLinks,
] as const

const navLinkClass =
  'whitespace-nowrap font-gotham text-[12px] font-medium tracking-[0.16em] 2xl:tracking-[0.25em] uppercase text-[#161E36] hover:text-green transition-colors duration-300 px-2.5 2xl:px-3.5'

export default function Header() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-muted/60 bg-cream transition-shadow duration-300 ${
          scrolled ? 'shadow-card' : ''
        }`}
      >
        <div className="relative flex items-center justify-start px-5 py-3.5 md:justify-center md:px-10 md:py-4">
          <nav className="hidden flex-1 items-center justify-end md:flex">
            {leftLinks.map(link => (
              <TransitionLink key={link.href} href={link.href} className={navLinkClass}>
                {t(link.key)}
              </TransitionLink>
            ))}
          </nav>

          <TransitionLink
            href="/"
            className="flex-shrink-0 px-0 md:px-7"
            aria-label="The McDevitt Company — home"
          >
            <Logo color="fathom" className="h-[60px] w-[60px] md:h-16 md:w-16" />
          </TransitionLink>

          <nav className="hidden flex-1 items-center justify-start md:flex">
            {rightLinks.map(link => (
              <TransitionLink key={link.href} href={link.href} className={navLinkClass}>
                {t(link.key)}
              </TransitionLink>
            ))}
          </nav>

          <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center gap-4 md:flex 2xl:right-10 2xl:gap-7">
            <LanguageSwitcher variant="light" />
            <TransitionLink
              href="/#client-portal"
              className="whitespace-nowrap rounded-[3px] border-[1.5px] border-green px-4 py-2 font-gotham text-[10px] font-bold tracking-[0.2em] uppercase text-green transition-colors duration-300 hover:bg-green hover:text-white"
            >
              {t('clientLogin')}
            </TransitionLink>
          </div>

          <button
            className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-[5px] p-2 md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className="block h-0.5 w-[22px] bg-navy" />
            <span className="block h-0.5 w-[22px] bg-navy" />
            <span className="block h-0.5 w-[22px] bg-navy" />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8 bg-cream transition-opacity duration-300 md:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          className="absolute right-5 top-5 font-gotham text-3xl font-light text-navy"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          &times;
        </button>
        {mobileLinks.map(link => (
          <TransitionLink
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-gotham text-sm font-medium tracking-[0.2em] uppercase text-[#161E36] transition-colors duration-300 hover:text-green"
          >
            {t(link.key)}
          </TransitionLink>
        ))}
        <div className="mt-4 flex flex-col items-center gap-5 border-t border-muted pt-6">
          <LanguageSwitcher
            variant="light"
            menuPlacement="top"
            onLocaleChange={() => setMenuOpen(false)}
          />
          <TransitionLink
            href="/#client-portal"
            onClick={() => setMenuOpen(false)}
            className="inline-block rounded-[3px] border-[1.5px] border-green px-7 py-3 font-gotham text-[11px] font-bold tracking-[0.2em] uppercase text-green transition-colors duration-300 hover:bg-green hover:text-white"
          >
            {t('clientLogin')}
          </TransitionLink>
        </div>
      </div>
    </>
  )
}
