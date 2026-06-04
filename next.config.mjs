import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // NOTE: on Next 14 these live under `experimental`. They were only promoted
  // to top-level config in Next 15, so at the top level Next 14 silently
  // ignores them — which let .next/cache and public/ get traced into the
  // serverless functions and blew past Vercel's 250 MB limit.
  experimental: {
    serverComponentsExternalPackages: [
      '@keystatic/core',
      '@keystatic/next',
      '@markdoc/markdoc',
      'isomorphic-git',
      '@isomorphic-git/lightning-fs',
    ],
    outputFileTracingExcludes: {
      '**/*': [
        'public/**',
        '.next/cache/**',
        '.git/**',
        'scripts/**',
        'node_modules/.cache/**',
        'node_modules/@keystatic/**',
        'node_modules/isomorphic-git/**',
      ],
    },
  },
};

export default withNextIntl(nextConfig);
