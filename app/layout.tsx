import GoogleAnalytics from '@/components/google-analytics'
import { Header } from '@/components/ui/header'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Oxygen } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const oxygen = Oxygen({ weight: ['300', '400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bora Churrasco! ("Calculadora de Churrasco")',
  description:
    'Bora Churrasco é a ferramenta perfeita ("Calculadora de Churrasco") para calcular o seu churrasco.',
  manifest: 'https://www.borachurrasco.app/manifest.json',
  keywords: ['Calculadora de Churraso', 'Churrasco', 'Calculadora'],
  openGraph: {
    title: 'Bora Churrasco! ("Calculadora de Churrasco")',
    description:
      'Bora Churrasco é a ferramenta perfeita ("Calculadora de Churrasco") para calcular o seu churrasco.',
    url: `https://www.borachurrasco.app`,
    images: [
      {
        url: 'https://www.borachurrasco.app/images/ms-icon-310x310.png',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'' + oxygen.className}>
        <ScrollArea className="absolute h-screen  bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-red-600 via-red-900 to-amber-900">
          <Header />
          {children}
        </ScrollArea>
        <Analytics />
        <Script
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9729996201347510"
        />
        <GoogleAnalytics
          GA_TRACKING_ID={process.env.GA_TRACKING_ID as string}
        />
      </body>
    </html>
  )
}
