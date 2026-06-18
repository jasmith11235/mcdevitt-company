import { auth } from '@/lib/auth'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const intlMiddleware = createIntlMiddleware(routing)

export default auth(function middleware(req) {
  const { pathname } = req.nextUrl
  const session = req.auth

  if (pathname.startsWith('/keystatic/signin')) {
    if (session) return NextResponse.redirect(new URL('/keystatic', req.url))
    return NextResponse.next()
  }

  if (pathname.startsWith('/keystatic')) {
    if (!session) return NextResponse.redirect(new URL('/keystatic/signin', req.url))
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin')) {
    if (!session) return NextResponse.redirect(new URL('/keystatic/signin', req.url))
    if (session.user.role !== 'superadmin') return NextResponse.redirect(new URL('/keystatic', req.url))
    return NextResponse.next()
  }

  return intlMiddleware(req as NextRequest)
})

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
}
