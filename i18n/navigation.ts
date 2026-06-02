import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Locale-aware navigation primitives. These automatically add the active
// locale prefix, so components never have to think about it.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
