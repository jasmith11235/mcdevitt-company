/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  outputFileTracingExcludes: {
    '**/*': [
      'public/**',
      '.next/cache/**',
      '.git/**',
      'scripts/**',
      'node_modules/.cache/**',
    ],
  },
};

export default nextConfig;
