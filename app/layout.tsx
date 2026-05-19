import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
