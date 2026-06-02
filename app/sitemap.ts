import type { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/i18n/routing'

const BASE_URL = 'https://mcdevittco.com'

// Page paths shared across locales (relative to the locale root).
const PAGES = [
  { path: '', priority: 1.0 },
  { path: '/news', priority: 0.8 },
  { path: '/reading-room', priority: 0.8 },
] as const

function urlFor(locale: string, path: string) {
  const prefix = locale === defaultLocale ? '' : `/${locale}`
  return `${BASE_URL}${prefix}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, priority }) =>
    locales.map(locale => ({
      url: urlFor(locale, path),
      changeFrequency: 'weekly' as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, urlFor(l, path)]),
        ),
      },
    })),
  )
}
