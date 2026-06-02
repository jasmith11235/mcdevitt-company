import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },

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
};

export default withNextIntl(nextConfig);
