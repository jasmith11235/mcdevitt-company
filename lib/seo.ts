import type { Metadata } from 'next'
import { locales, defaultLocale, type Locale } from '@/i18n/routing'

export const SITE_URL = 'https://mcdevittco.com'

function urlFor(locale: string, path: string) {
  const prefix = locale === defaultLocale ? '' : `/${locale}`
  return `${prefix}${path}` || '/'
}

/**
 * Builds canonical + hreflang alternates for a given page path (e.g. '' for
 * home, '/news'). Keeps the default locale at the root and prefixes the rest.
 */
export function buildAlternates(locale: Locale, path: string): Metadata['alternates'] {
  return {
    canonical: urlFor(locale, path),
    languages: Object.fromEntries(locales.map(l => [l, urlFor(l, path)])),
  }
}
