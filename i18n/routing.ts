import { defineRouting } from 'next-intl/routing'

export const locales = ['en', 'nl', 'fr', 'es', 'de', 'it'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

/**
 * Display metadata for the language switcher.
 * `label` is the language's endonym (its name in its own language).
 */
export const localeMeta: Record<Locale, { label: string; short: string }> = {
  en: { label: 'English', short: 'EN' },
  nl: { label: 'Nederlands', short: 'NL' },
  fr: { label: 'Français', short: 'FR' },
  es: { label: 'Español', short: 'ES' },
  de: { label: 'Deutsch', short: 'DE' },
  it: { label: 'Italiano', short: 'IT' },
}

export const routing = defineRouting({
  locales,
  defaultLocale,
  // English stays at the root (/news), other locales are prefixed (/de/news).
  localePrefix: 'as-needed',
})
