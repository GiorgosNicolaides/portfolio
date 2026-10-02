/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/research', destination: '/#experience', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
    ]
  },
}

export default nextConfig
