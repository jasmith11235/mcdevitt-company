/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  outputFileTracingExcludes: {
    '/*': [
      './.git/**/*',
      './scripts/**/*',
      './public/graphics/**/*',
      './public/images/**/*',
      './.next/cache/**/*',
    ],
  },
};

export default nextConfig;
