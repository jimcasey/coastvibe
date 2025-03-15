'use client'

import { Layout, Typography } from 'antd'

import { Investments } from './components/investments'
import { InvestmentProvider } from './context'

const { Header, Content, Footer } = Layout
const { Title } = Typography

const Home = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: 'var(--background)', padding: '16px 32px' }}>
        <Title level={3} style={{ margin: 0, color: 'var(--foreground)' }}>COASTVIBE</Title>
      </Header>
      <Content style={{ maxWidth: '1152px', width: '100%', margin: '0 auto', padding: '32px' }}>
        <InvestmentProvider>
          <Investments />
        </InvestmentProvider>
      </Content>
      <Footer style={{ textAlign: 'center', background: 'var(--background)', padding: '16px' }}></Footer>
    </Layout>
  )
}

export default Home
