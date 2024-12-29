import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { Jua, PT_Sans } from 'next/font/google'

const pt = PT_Sans({
  subsets: ['latin'],
  variable: '--font-pt',
  weight: ['400', '700'],
  display: 'swap',
})

const jua = Jua({
  subsets: ['latin'],
  variable: '--font-jua',
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Brick Print',
  description: 'Make printable stickers for your Brick storage boxes.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${pt.variable} ${jua.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
