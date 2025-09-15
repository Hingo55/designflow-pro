import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import SimpleChatInterface from '@/components/ai/SimpleChatInterface'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'DesignFlow Pro - Design4 Framework Platform',
  description: 'A comprehensive platform that helps business leaders implement the Design4 framework through interactive tools, resources, and community features.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        {children}
        <SimpleChatInterface />
      </body>
    </html>
  )
}