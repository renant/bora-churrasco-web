import { Header } from "@/components/ui/header";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SoftwareApplicationJsonLd } from "next-seo";

import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#FEF3C7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.borachurrasco.app"),
  title: {
    default: "Calculadora de Churrasco Online Grátis - Bora Churrasco!",
    template: "%s | Bora Churrasco",
  },
  description:
    "Calcule a quantidade exata de carne, acompanhamentos e bebidas para seu churrasco. Ferramenta gratuita para planejar churrasco com precisão. Evite desperdícios!",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  keywords: [
    "Calculadora de Churrasco",
    "Churrasco",
    "Quantidade de Carne por Pessoa",
    "Como Calcular Churrasco",
    "Planejamento de Churrasco",
    "Churrasco para Grupos",
    "Lista de Compras Churrasco",
    "App Churrasco",
  ],
  openGraph: {
    title: "Calculadora de Churrasco Online Grátis - Bora Churrasco!",
    description:
      "Planeje seu churrasco perfeito! Calcule carne, bebidas e acompanhamentos. Ferramenta gratuita para organizar churrascos sem desperdício.",
    url: "/",
    siteName: "Bora Churrasco",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Churrasco Online Grátis - Bora Churrasco!",
    description:
      "Planeje seu churrasco perfeito! Calcule carne, bebidas e acompanhamentos.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        {/* Preconnect to external domains for better performance */}
        <link
          rel="dns-prefetch"
          href="https://firebasestorage.googleapis.com"
        />
        <link
          rel="dns-prefetch"
          href="https://pub-992a36cf1a614410b68f49587c83df71.r2.dev"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        {/* Preload critical above-the-fold images */}
        <link
          rel="preload"
          as="image"
          href="/google-play-badge.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/app-sample.webp"
          type="image/webp"
        />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 font-sans antialiased">
        <Header />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
        <Script
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9729996201347510"
          crossOrigin="anonymous"
        />
        <Script id="clarity-script" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "s5i93zjg9g");
          `}
        </Script>
        <GoogleTagManager gtmId={process.env.GA_TRACKING_ID as string} />
        <SoftwareApplicationJsonLd
          name="Bora Churrasco"
          offers={{ price: 0, priceCurrency: "BRL" }}
          applicationCategory="UtilityApplication"
          operatingSystem="All"
        />
      </body>
    </html>
  );
}
