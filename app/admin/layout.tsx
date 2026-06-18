import type { Metadata } from 'next'
import { Fraunces } from 'next/font/google'
import '@fontsource-variable/mona-sans'
import '../globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  axes: ['opsz'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Admin — McDevitt Content Studio',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body>{children}</body>
    </html>
  )
}
