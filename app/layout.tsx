import type { Metadata } from 'next'
import { Fraunces } from 'next/font/google'
import '@fontsource-variable/mona-sans'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  axes: ['opsz'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The McDevitt Company',
  description: 'A full-service retail real estate advisory firm. Strategic vision, data-driven insight, and global reach since 1997.',
  openGraph: {
    title: 'The McDevitt Company',
    description: 'A full-service retail real estate advisory firm.',
    url: 'https://mcdevittco.com',
    siteName: 'The McDevitt Company',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body>{children}</body>
    </html>
  )
}
