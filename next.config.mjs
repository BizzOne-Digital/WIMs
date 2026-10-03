/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve resized AVIF/WebP instead of the raw 1.6 MB hero PNG (needs a Next server, e.g. Vercel).
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
