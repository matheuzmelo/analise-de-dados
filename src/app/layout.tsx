import MuiTheme from '@/components/MuiTheme';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IBGE Charts',
  description: 'Gerador de gráficos das informações do IBGE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="pt-BR">
        <body className={inter.className}>
          <div className='h-full min-h-screen bg-slate-900 flex flex-col items-center justify-between text-white'>
            <MuiTheme>
              {children}
            </MuiTheme>
          </div>
          <Analytics/>
        </body>
      </html>
  )
}
