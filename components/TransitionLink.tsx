'use client'

import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from 'react'
import { Link, useRouter, usePathname } from '@/i18n/navigation'

type TransitionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

/**
 * Locale-aware drop-in replacement for next/link.
 *
 * - Uses next-intl's navigation so the active locale prefix is added
 *   automatically (e.g. `/news` -> `/de/news`).
 * - Wraps client-side navigation in `document.startViewTransition()` when the
 *   browser supports it; otherwise falls back to the `.page-enter` CSS animation.
 * - Pure hash anchors (`#contact`) render a plain anchor so the browser's
 *   smooth-scroll handles them on the current page.
 * - Modifier-clicks (cmd/ctrl/shift/alt) pass through so "open in new tab" works.
 */
const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink({ href, onClick, ...rest }, ref) {
    const router = useRouter()
    const pathname = usePathname()

    // Pure in-page hash links: let the browser handle them natively.
    if (href.startsWith('#')) {
      return <a ref={ref} href={href} onClick={onClick} {...rest} />
    }

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e)
      if (e.defaultPrevented) return

      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      if (e.button !== 0) return

      if (/^(https?:|mailto:|tel:)/.test(href)) return

      if (typeof document === 'undefined') return
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => unknown
      }
      if (typeof doc.startViewTransition !== 'function') return

      // Compare against the locale-stripped pathname (what next-intl returns).
      const targetPath = href.split('#')[0] || '/'
      if (targetPath === pathname) return

      e.preventDefault()
      doc.startViewTransition(() => {
        router.push(href)
      })
    }

    return <Link ref={ref} href={href} onClick={handleClick} {...rest} />
  },
)

export default TransitionLink
