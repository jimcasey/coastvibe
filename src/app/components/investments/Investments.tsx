'use client'

import { useInvestments } from '../../context/InvestmentContext'
import { formatCurrency, formatPercent } from '../../utils/format'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Investment } from '../../types'
import { InvestmentForm } from './InvestmentForm'

export const Investments = () => {
  const { investments, totalValue } = useInvestments()

  const columns: ColumnsType<Investment> = [
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
  ]

  // Add a summary row for the total
  const summary = () => {
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
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Investment Portfolio</h2>
      <Table 
        columns={columns} 
        dataSource={investments} 
        rowKey="Symbol"
        pagination={false}
        summary={summary}
      />
      <div className="mt-4">
        <InvestmentForm />
      </div>
    </div>
  )
}
