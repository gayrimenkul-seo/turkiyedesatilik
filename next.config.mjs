/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['turkiyedesatilik.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig
