import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BananaSense AI - Premium Ripeness Detection',
  description: 'Enterprise-grade AI ripeness detection for bananas. Real-time analysis, batch processing, and intelligent supply chain optimization.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ '--font-space-grotesk': spaceGrotesk.style.fontFamily, '--font-inter': inter.style.fontFamily } as React.CSSProperties}>
      <body className={`${geist.className} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
