import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'McDevitt CMS',
  robots: { index: false, follow: false },
}

// Separate root layout for the Keystatic CMS so it stays outside the
// localized `[locale]` tree and renders its own document shell.
export default function CmsRootLayout({
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
