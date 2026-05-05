import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Landright — Mineral Rights Marketplace',
    template: '%s | Landright',
  },
  description: 'Buy and sell mineral rights across the United States. Browse active listings, get valuations, and connect with a trusted broker.',
  keywords: ['mineral rights', 'sell mineral rights', 'buy mineral rights', 'royalty rights', 'oil and gas minerals'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Landright',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
