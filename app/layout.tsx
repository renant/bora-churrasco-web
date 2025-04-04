import { Header } from '@/components/ui/header';
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Oxygen } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const oxygen = Oxygen({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: '#FEF3C7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.borachurrasco.app'),
  title: {
    default: 'Calculadora de Churrasco Online Grátis - Bora Churrasco!',
    template: '%s | Bora Churrasco',
  },
  description:
    'Calcule a quantidade exata de carne, acompanhamentos e bebidas para seu churrasco. Ferramenta gratuita para planejar churrasco com precisão. Evite desperdícios!',
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  keywords: [
    'Calculadora de Churrasco',
    'Churrasco',
    'Quantidade de Carne por Pessoa',
    'Como Calcular Churrasco',
    'Planejamento de Churrasco',
    'Churrasco para Grupos',
    'Lista de Compras Churrasco',
    'App Churrasco',
  ],
  openGraph: {
    title: 'Calculadora de Churrasco Online Grátis - Bora Churrasco!',
    description:
      'Planeje seu churrasco perfeito! Calcule carne, bebidas e acompanhamentos. Ferramenta gratuita para organizar churrascos sem desperdício.',
    url: '/',
    siteName: 'Bora Churrasco',
    images: [
      {
        url: '/images/ms-icon-310x310.png',
        width: 310,
        height: 310,
        alt: 'Bora Churrasco Logo',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de Churrasco Online Grátis - Bora Churrasco!',
    description:
      'Planeje seu churrasco perfeito! Calcule carne, bebidas e acompanhamentos.',
    images: ['/images/ms-icon-310x310.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Bora Churrasco',
  description:
    'Calculadora de Churrasco Online Grátis - Planeje seu churrasco com precisão',
  url: 'https://www.borachurrasco.app',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'All',
  inLanguage: 'pt-BR',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'BRL',
  },
  author: {
    '@type': 'Organization',
    name: 'Bora Churrasco',
    url: 'https://www.borachurrasco.app',
  },
  potentialAction: {
    '@type': 'UseAction',
    target: 'https://www.borachurrasco.app/participantes',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={oxygen.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
        <Header />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Analytics />
        <Script
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9729996201347510"
          crossOrigin="anonymous"
        />
        <GoogleTagManager gtmId={process.env.GA_TRACKING_ID as string} />
        <SpeedInsights />
      </body>
    </html>
  );
}
