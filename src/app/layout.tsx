'use client'

import React from 'react'

import { ConfigProvider, Layout, Typography, theme } from 'antd'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'

import StyledComponentsRegistry from './components/StyledComponentsRegistry'
import './globals.css'

const { Header, Content, Footer } = Layout
const { Title } = Typography

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

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
            <Layout style={{ minHeight: '100vh' }}>
              <Header style={{ background: 'var(--background)', padding: '16px 32px' }}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                  <Title level={3} style={{ margin: 0, color: 'var(--foreground)' }}>
                    COASTVIBE
                  </Title>
                </Link>
              </Header>
              <Content
                style={{
                  maxWidth: '1152px',
                  width: '100%',
                  margin: '0 auto',
                  padding: '32px',
                }}
              >
                {children}
              </Content>
              <Footer
                style={{
                  textAlign: 'center',
                  background: 'var(--background)',
                  padding: '16px',
                }}
              ></Footer>
            </Layout>
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

export default RootLayout
