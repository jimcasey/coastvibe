'use client'

import React from 'react'

import { Layout, Typography, Card, Row, Col } from 'antd'
import Link from 'next/link'

const { Header, Content, Footer } = Layout
const { Title } = Typography

const Home = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: 'var(--background)', padding: '16px 32px' }}>
        <Title level={3} style={{ margin: 0, color: 'var(--foreground)' }}>
          COASTVIBE
        </Title>
      </Header>
      <Content
        style={{
          maxWidth: '1152px',
          width: '100%',
          margin: '0 auto',
          padding: '32px',
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Link href="/portfolio" style={{ textDecoration: 'none' }}>
              <Card hoverable>
                <Title level={4}>Portfolio</Title>
                <p>Manage and track your investment portfolio</p>
              </Card>
            </Link>
          </Col>
          <Col xs={24} sm={8}>
            <Link href="/retirement-budget" style={{ textDecoration: 'none' }}>
              <Card hoverable>
                <Title level={4}>Retirement Budget</Title>
                <p>Plan your retirement budget</p>
              </Card>
            </Link>
          </Col>
          <Col xs={24} sm={8}>
            <Link
              href="/retirement-projections"
              style={{ textDecoration: 'none' }}
            >
              <Card hoverable>
                <Title level={4}>Retirement Projections</Title>
                <p>View your retirement projections</p>
              </Card>
            </Link>
          </Col>
        </Row>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          background: 'var(--background)',
          padding: '16px',
        }}
      ></Footer>
    </Layout>
  )
}

export default Home
