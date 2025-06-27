import { Header } from "@/components/ui/header";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";

import Script from "next/script";
import "./globals.css";

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
    images: [
      {
        url: "/images/ms-icon-310x310.png",
        width: 310,
        height: 310,
        alt: "Bora Churrasco Logo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Churrasco Online Grátis - Bora Churrasco!",
    description:
      "Planeje seu churrasco perfeito! Calcule carne, bebidas e acompanhamentos.",
    images: ["/images/ms-icon-310x310.png"],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Bora Churrasco",
  description:
    "Calculadora de Churrasco Online Grátis - Planeje seu churrasco com precisão",
  url: "https://www.borachurrasco.app",
  applicationCategory: "UtilityApplication",
  operatingSystem: "All",
  inLanguage: "pt-BR",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  author: {
    "@type": "Organization",
    name: "Bora Churrasco",
    url: "https://www.borachurrasco.app",
  },
  potentialAction: {
    "@type": "UseAction",
    target: "https://www.borachurrasco.app/participantes",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="image"
          href="/google-play-badge.avif"
          type="image/avif"
        />
        <link
          rel="preload"
          as="image"
          href="/app-sample.avif"
          type="image/avif"
        />
        <link
          rel="preload"
          as="image"
          href="/images/ms-icon-310x310.png"
          type="image/png"
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
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9729996201347510"
          crossOrigin="anonymous"
        />
        <Script 
          id="clarity-script"
          strategy="lazyOnload"
        >
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "s5i93zjg9g");
          `}
        </Script>
        <GoogleTagManager gtmId={process.env.GA_TRACKING_ID as string} />
      </body>
    </html>
  );
}
