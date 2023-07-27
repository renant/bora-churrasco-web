import { Header } from '@/components/ui/header'
import type { Metadata } from 'next'
import { Oxygen } from 'next/font/google'
import './globals.css'

const oxygen = Oxygen({ weight: ['300', '400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bora Churrasco - O Melhor App para Churrascos Incríveis!',
  description: 'Descubra o aplicativo definitivo para churrasqueiros apaixonados! O Bora Churrasco é a ferramenta perfeita para calcular o seu churrasco. Tenha uma experiência única de churrasco com recursos incríveis e uma interface intuitiva. Baixe agora e torne-se um mestre do churrasco!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={"bg-red-800 " + oxygen.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
