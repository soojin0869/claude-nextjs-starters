import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'", // public/libs UMD 스크립트 허용
  "style-src 'self' 'unsafe-inline'", // Tailwind inline 스타일 허용
  "img-src 'self' data: blob:", // canvas.toDataURL, blob URL 허용
  "connect-src 'self' https://api.notion.com", // Notion API 직접 호출
  "frame-ancestors 'none'", // X-Frame-Options 보완
].join('; ')

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)
