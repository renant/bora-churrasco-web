import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bora Churrasco - O Melhor App para Churrascos Incríveis!',
  description: 'Descubra o aplicativo definitivo para churrasqueiros apaixonados! O Bora Churrasco é a ferramenta perfeita para calcular o seu churrasco. Tenha uma experiência única de churrasco com recursos incríveis e uma interface intuitiva. Baixe agora e torne-se um mestre do churrasco!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={"bg-red-800 " + inter.className}>

        {children}
      </body>
    </html>
  )
}
