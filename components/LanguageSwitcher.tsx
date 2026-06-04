'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { locales, localeMeta, type Locale } from '@/i18n/routing'

type Variant = 'light' | 'dark'

const GlobeIcon = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden
    className={className}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.4 3.8 5.6 3.8 9s-1.3 6.6-3.8 9c-2.5-2.4-3.8-5.6-3.8-9S9.5 5.4 12 3Z" />
  </svg>
)

export default function LanguageSwitcher({ variant = 'light' }: { variant?: Variant }) {
  const t = useTranslations('languageSwitcher')
  const activeLocale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const selectLocale = (locale: Locale) => {
    setOpen(false)
    if (locale === activeLocale) return
    // Preserve any active query string (e.g. Reading Room filters).
    const qs = typeof window !== 'undefined' ? window.location.search : ''
    router.replace(`${pathname}${qs}`, { locale })
  }

  const isDark = variant === 'dark'
  const triggerColor = isDark
    ? 'text-white/80 hover:text-white'
    : 'text-[#1D2B45] hover:text-[#3D9B82]'

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('select')}
        className={`group inline-flex items-center gap-1.5 font-sans text-[11px] tracking-widest uppercase transition-colors duration-200 ${triggerColor}`}
      >
        <GlobeIcon className="w-4 h-4 opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
        <span>{localeMeta[activeLocale].short}</span>
        <svg
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
          className={`w-2.5 h-2.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="m2.5 4 3.5 3.5L9.5 4" />
        </svg>
      </button>

      <div
        role="listbox"
        aria-label={t('label')}
        className={`absolute right-0 mt-3 min-w-[160px] origin-top-right border border-[#1D2B45]/10 bg-white shadow-[0_12px_40px_-12px_rgba(29,43,69,0.35)] transition-all duration-200 ${
          open
            ? 'pointer-events-auto opacity-100 translate-y-0 scale-100'
            : 'pointer-events-none opacity-0 -translate-y-1 scale-95'
        }`}
      >
        {locales.map(locale => {
          const active = locale === activeLocale
          return (
            <button
              key={locale}
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => selectLocale(locale)}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left font-sans text-[11px] tracking-wider uppercase transition-colors duration-150 ${
                active
                  ? 'text-[#3D9B82]'
                  : 'text-[#1D2B45]/70 hover:bg-stone-50 hover:text-[#1D2B45]'
              }`}
            >
              <span>{localeMeta[locale].label}</span>
              <span className="ml-4 font-light tabular-nums text-[#1D2B45]/30">
                {localeMeta[locale].short}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
