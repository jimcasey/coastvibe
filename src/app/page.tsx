'use client'

import React from 'react'

import { Card, Row, Col, Typography } from 'antd'
import Link from 'next/link'

const { Title } = Typography

const Home = () => {
  return (
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
        <Link href="/retirement-projections" style={{ textDecoration: 'none' }}>
          <Card hoverable>
            <Title level={4}>Retirement Projections</Title>
            <p>View your retirement projections</p>
          </Card>
        </Link>
      </Col>
    </Row>
  )
}

export default Home
