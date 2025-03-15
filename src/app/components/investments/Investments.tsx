'use client'

import React from 'react'

import { Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { useInvestments } from '../../context/InvestmentContext'
import { Investment } from '../../types'
import { formatCurrency, formatPercent } from '../../utils/format'

import { InvestmentForm } from './InvestmentForm'

const { Title } = Typography

export const Investments = () => {
  const { investments, totalValue } = useInvestments()

  // Define table columns with memoization to prevent unnecessary re-renders
  const columns = React.useMemo<ColumnsType<Investment>>(() => [
    {
      title: 'Symbol',
      dataIndex: 'Symbol',
      key: 'symbol',
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'quantity',
      render: (quantity: number) => quantity.toLocaleString(),
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'price',
      render: (price: number) => formatCurrency(price),
    },
    {
      title: 'Category',
      dataIndex: 'Category',
      key: 'category',
    },
    {
      title: 'Value',
      dataIndex: 'Value',
      key: 'value',
      render: (value: number) => formatCurrency(value),
    },
    {
      title: 'Allocation',
      dataIndex: 'Allocation',
      key: 'allocation',
      render: (allocation: number) => formatPercent(allocation),
    },
  ], [])

  // Create table summary row
  const renderSummary = () => {
    return (
      <Table.Summary fixed>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={4}>
            <strong>Total</strong>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={1}>
            <strong>{formatCurrency(totalValue)}</strong>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={2}>
            <strong>100%</strong>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <Title level={2} style={{ marginBottom: '16px' }}>Investment Portfolio</Title>
      <Table
        columns={columns}
        dataSource={investments}
        rowKey="Symbol"
        pagination={false}
        summary={renderSummary}
      />
      <div style={{ marginTop: '16px' }}>
        <InvestmentForm />
      </div>
    </div>
  )
}
