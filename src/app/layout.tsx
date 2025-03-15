import '@ant-design/v5-patch-for-react-19'

import { Geist, Geist_Mono } from 'next/font/google'

import { ConfigProvider, theme } from 'antd'
import type { Metadata } from 'next'

import StyledComponentsRegistry from './components/AntdRegistry'
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StyledComponentsRegistry>
          <ConfigProvider
            theme={{
              algorithm: theme.defaultAlgorithm,
              token: {
                colorPrimary: '#3b82f6', // Tailwind blue-500
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
