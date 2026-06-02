'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Logo from './Logo'
import TransitionLink from './TransitionLink'
import LanguageSwitcher from './LanguageSwitcher'

const navLinks = [
  { key: 'ourStory', href: '/#our-story' },
  { key: 'services', href: '/#services' },
  { key: 'dataScience', href: '/#data-science' },
  { key: 'projects', href: '/#projects' },
  { key: 'news', href: '/news' },
  { key: 'readingRoom', href: '/reading-room' },
  { key: 'offices', href: '/#offices' },
  { key: 'contact', href: '#contact' },
] as const

export default function Header() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'header-glass shadow-md' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <TransitionLink href="/" className="flex-shrink-0" aria-label="The McDevitt Company — home">
            <Logo color="fathom" className="h-12 w-12 md:h-16 md:w-16" />
          </TransitionLink>
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className="font-sans text-xs tracking-widest uppercase text-[#1D2B45] hover:text-[#3D9B82] transition-colors duration-200"
              >
                {t(link.key)}
              </TransitionLink>
            ))}
            <span className="h-4 w-px bg-[#1D2B45]/15" aria-hidden />
            <LanguageSwitcher variant="light" />
          </nav>
          <button
            className="lg:hidden flex flex-col gap-1.5 p-3 min-w-[44px] min-h-[44px] items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-0.5 bg-[#1D2B45] transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#1D2B45] transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#1D2B45] transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>
      {/* Mobile menu overlay */}
      <div className={`fixed inset-0 z-40 bg-[#1D2B45] transition-transform duration-500 lg:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-2">
          {navLinks.map(link => (
            <TransitionLink
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-sm tracking-widest uppercase text-white hover:text-[#3D9B82] transition-colors duration-300 py-3 px-6 min-h-[44px] flex items-center"
            >
              {t(link.key)}
            </TransitionLink>
          ))}
          <div className="mt-6 pt-6 border-t border-white/10">
            <LanguageSwitcher variant="dark" />
          </div>
        </div>
      </div>
    </>
  )
}
