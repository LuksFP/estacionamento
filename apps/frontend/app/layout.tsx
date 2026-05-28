import type { Metadata } from 'next'
import { Sora, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: { default: 'ParkOS', template: '%s · ParkOS' },
  description: 'Sistema de Gestão de Estacionamento',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
