import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Plotrix - Plataforma de Criação Literária Assistida por IA',
  description: 'Onde suas ideias ganham vida. Transforme suas histórias em bestsellers com o poder da IA.',
  keywords: 'escrita, literatura, IA, inteligência artificial, livros, romance, autor, escritor',
  authors: [{ name: 'Plotrix' }],
  creator: 'Plotrix',
  publisher: 'Plotrix',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://plotrix.com',
    title: 'Plotrix - Plataforma de Criação Literária Assistida por IA',
    description: 'Onde suas ideias ganham vida. Transforme suas histórias em bestsellers com o poder da IA.',
    siteName: 'Plotrix',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plotrix - Plataforma de Criação Literária Assistida por IA',
    description: 'Onde suas ideias ganham vida. Transforme suas histórias em bestsellers com o poder da IA.',
    creator: '@plotrix',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
      </body>
    </html>
  )
}