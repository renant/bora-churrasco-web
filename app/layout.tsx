import { Header } from '@/components/ui/header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Oxygen } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const oxygen = Oxygen({ weight: ['300', '400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bora Churrasco - O Melhor App para Churrascos Incríveis!',
  description: 'Descubra o aplicativo definitivo para churrasqueiros apaixonados! O Bora Churrasco é a ferramenta perfeita ("Calculadora de Churrasco") para calcular o seu churrasco. Tenha uma experiência única de churrasco com recursos incríveis e uma interface intuitiva. Baixe agora e torne-se um mestre do churrasco!',
  manifest: 'https://www.borachurrasco.app/manifest.json',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={"" + oxygen.className}>
        <ScrollArea className='absolute h-screen  bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-red-600 via-red-900 to-amber-900'>
          <Header />
          {children}
        </ScrollArea>
        <Analytics />
        <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9729996201347510" />
      </body>
    </html>
  )
}
