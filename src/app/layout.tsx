import type { Metadata } from 'next'
import { Alef } from 'next/font/google'
import './globals.css'

const alef = Alef({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Plantas em Ação',
  description: 'Plantas em Ação: Descobrindo e Crescendo',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${alef.className} uppercase`}>{children}</body>
    </html>
  )
}
