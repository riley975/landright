import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'We Buy Minerals — Get a Free Offer on Your Mineral Rights', template: '%s | WeBuyMinerals' },
  description: 'We buy mineral rights nationwide. Get a free, no-obligation offer on your oil and gas minerals. Fast closings, top dollar, no hassle.',
  keywords: ['sell mineral rights', 'we buy mineral rights', 'sell oil and gas minerals', 'mineral rights buyer', 'mineral rights offer'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
