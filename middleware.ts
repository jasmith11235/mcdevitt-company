import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match all pathnames except for:
  // - /api, /trpc (API routes)
  // - /keystatic (the CMS, intentionally not localized)
  // - /_next, /_vercel (Next.js internals)
  // - anything containing a dot (static files: .mp4, .jpg, robots.txt, ...)
  matcher: ['/((?!api|trpc|keystatic|_next|_vercel|.*\\..*).*)'],
}
