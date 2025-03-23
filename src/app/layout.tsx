import { ConfigProvider, theme } from 'antd'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import StyledComponentsRegistry from './components/StyledComponentsRegistry'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'COASTVIBE',
  description: 'Investment Portfolio Tracker',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ fontFamily: 'var(--font-geist-sans)' }}
      >
        <StyledComponentsRegistry>
          <ConfigProvider
            theme={{
              algorithm: theme.defaultAlgorithm,
              token: {
                colorPrimary: '#3b82f6',
                fontFamily: 'var(--font-geist-sans)',
              },
            }}
          >
            {children}
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

export default RootLayout
