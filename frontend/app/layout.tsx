import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { ToastProvider } from '@/components/providers/ToastProvider'

export const metadata: Metadata = {
  title: 'FF Token Tool - Free Fire Utilities',
  description: 'Professional platform for Free Fire players with JWT/EAT generators, bio editors, and bio library.',
  keywords: 'Free Fire, Token Generator, Bio Editor, Tools',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0a0e27',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-dark text-white">
        <ToastProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </ToastProvider>
      </body>
    </html>
  )
}