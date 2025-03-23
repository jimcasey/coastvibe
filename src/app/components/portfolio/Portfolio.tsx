'use client'

import React from 'react'

import {
  SaveOutlined,
  EditOutlined,
  CloseOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Table,
  Typography,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Button,
  Tooltip,
} from 'antd'
import type { TableProps } from 'antd'

import { useInvestments } from '../../context'
import { Investment, InvestmentData } from '../../types'
import { formatCurrency, formatPercent } from '../../utils/format'

const { Title } = Typography

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: string
  inputType: 'text' | 'number'
  children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === 'number' ? (
      <InputNumber
        min={0}
        step={dataIndex === 'Price' ? 0.01 : 1}
        precision={dataIndex === 'Price' ? 2 : 0}
      />
    ) : (
      <Input />
    )

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `${title} is required`,
            },
          ]}
          hasFeedback
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

export const Portfolio = () => {
  const {
    investments,
    totalValue,
    updateInvestment,
    addInvestment,
    deleteInvestment,
  } = useInvestments()
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = React.useState<string>('')

  const isEditing = (record: Investment) => record.Symbol === editingKey

  const edit = (record: Investment) => {
    form.setFieldsValue({
      Symbol: record.Symbol,
      Quantity: record.Quantity,
      Price: record.Price,
      Category: record.Category,
    })
    setEditingKey(record.Symbol)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: string) => {
    try {
      const row = (await form.validateFields()) as Partial<InvestmentData>

      // Update the investment
      updateInvestment(key, row)
      setEditingKey('')
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const handleAdd = () => {
    const newInvestment: InvestmentData = {
      Symbol: '',
      Quantity: 0,
      Price: 0,
      Category: '',
    }

    addInvestment(newInvestment)

    // Start editing the new investment
    const newSymbol = newInvestment.Symbol
    form.setFieldsValue(newInvestment)
    setEditingKey(newSymbol)
  }

  const handleDelete = (symbol: string) => {
    deleteInvestment(symbol)
  }

  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'Symbol',
      editable: true,
      fixed: 'left',
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      editable: true,
      render: (quantity: number) => quantity.toLocaleString(),
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      editable: true,
      render: (price: number) => formatCurrency(price),
    },
    {
      title: 'Category',
      dataIndex: 'Category',
      editable: true,
    },
    {
      title: 'Value',
      dataIndex: 'Value',
      render: (value: number) => formatCurrency(value),
    },
    {
      title: 'Allocation',
      dataIndex: 'Allocation',
      render: (allocation: number) => formatPercent(allocation),
    },
    {
      dataIndex: 'action',
      width: 89,
      fixed: 'right',
      render: (_: unknown, record: Investment) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Tooltip title="Save">
              <Button
                icon={<SaveOutlined />}
                shape="circle"
                size="small"
                onClick={() => save(record.Symbol)}
                style={{ marginRight: 8 }}
              />
            </Tooltip>
            <Tooltip title="Cancel">
              <Button
                icon={<CloseOutlined />}
                shape="circle"
                size="small"
                onClick={cancel}
              />
            </Tooltip>
          </span>
        ) : (
          <span>
            <Tooltip title="Edit">
              <Button
                icon={<EditOutlined />}
                shape="circle"
                size="small"
                disabled={editingKey !== ''}
                onClick={() => edit(record)}
                style={{ marginRight: 8 }}
              />
            </Tooltip>
            <Popconfirm
              title="Delete investment"
              description="Are you sure you want to delete this investment?"
              onConfirm={() => handleDelete(record.Symbol)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                icon={<CloseOutlined />}
                shape="circle"
                size="small"
                disabled={editingKey !== ''}
              />
            </Popconfirm>
          </span>
        )
      },
    },
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: Investment) => ({
        record,
        inputType:
          col.dataIndex === 'Quantity' || col.dataIndex === 'Price'
            ? 'number'
            : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  }) as TableProps<Investment>['columns']

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
          <Table.Summary.Cell index={3}>
            <Tooltip title="Add investment">
              <Button
                icon={<PlusOutlined />}
                shape="circle"
                size="small"
                disabled={editingKey !== ''}
                onClick={handleAdd}
              />
            </Tooltip>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <Title level={2} style={{ marginBottom: '16px' }}>
        Portfolio
      </Title>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={investments}
          columns={mergedColumns}
          rowKey="Symbol"
          pagination={false}
          summary={renderSummary}
          scroll={{ x: 1000 }}
        />
      </Form>
    </div>
  )
}
