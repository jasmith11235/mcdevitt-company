'use client'

import Link, { type LinkProps } from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from 'react'

type TransitionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children?: React.ReactNode
  }

/**
 * Drop-in replacement for next/link that wraps client-side navigation in
 * `document.startViewTransition()` when the browser supports it. Falls back
 * to the standard Link behaviour (which our `.page-enter` CSS class then
 * animates) for older browsers.
 *
 * Behaviour:
 * - External links (http, mailto, tel) — passed through, no special handling.
 * - Pure hash anchors (`#contact`, `#our-story`) — passed through so the
 *   browser's smooth-scroll can do its thing.
 * - Same-page navigation (target === current pathname) — no transition.
 * - Modifier-clicks (cmd/ctrl/shift/alt) — passed through so "open in new tab"
 *   keeps working.
 */
const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink({ href, onClick, ...rest }, ref) {
    const router = useRouter()
    const pathname = usePathname()

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e)
      if (e.defaultPrevented) return

      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      if (e.button !== 0) return

      const target = typeof href === 'string' ? href : href.pathname ?? ''
      if (!target) return

      if (/^(https?:|mailto:|tel:)/.test(target)) return
      if (target.startsWith('#')) return

      if (typeof document === 'undefined') return
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => unknown
      }
      if (typeof doc.startViewTransition !== 'function') return

      if (target === pathname) return

      e.preventDefault()
      doc.startViewTransition(() => {
        router.push(target)
      })
    }

    return <Link ref={ref} href={href} onClick={handleClick} {...rest} />
  },
)

export default TransitionLink
