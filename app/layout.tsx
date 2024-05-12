/* eslint-disable no-undef */
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import KeyModal from '@/components/modal/keyModal'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'Audio-Transcription',
  description: 'Prueba técnica Frontend/Full Stack Developer'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <link rel='icon' href='/wave.svg' sizes='any' />
      <body className={poppins.className}>
        <KeyModal />
        {children}
      </body>
    </html>
  )
}
