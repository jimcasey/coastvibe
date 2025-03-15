'use client'

import React from 'react'

import { Table, Typography, Form, Input, InputNumber } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { useInvestments } from '../../context/InvestmentContext'
import { Investment, InvestmentData } from '../../types'
import { formatCurrency, formatPercent } from '../../utils/format'

const { Title } = Typography

// Extend ColumnType to include editable property
interface EditableColumn<T> extends Omit<ColumnsType<T>[number], 'dataIndex'> {
  editable?: boolean
  dataIndex?: keyof T | string
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: string
  inputType: 'text' | 'number' | 'select'
  record: Investment
  index: number
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
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

export const Investments = () => {
  const { investments, totalValue, updateInvestment, addInvestment } =
    useInvestments()
  const [form] = Form.useForm()
  const [editingKey, setEditingKey] = React.useState<string>('')
  const [isAddingNew, setIsAddingNew] = React.useState<boolean>(false)
  const [newInvestmentForm] = Form.useForm()

  // Create a dummy record for the new investment
  const newInvestmentRecord = React.useMemo<Investment>(
    () => ({
      Symbol: '',
      Quantity: 0,
      Price: 0,
      Category: '',
      Value: 0,
      Allocation: 0,
    }),
    [],
  )

  const isEditing = React.useCallback(
    (record: Investment) => record.Symbol === editingKey,
    [editingKey],
  )

  const edit = React.useCallback(
    (record: Investment) => {
      form.setFieldsValue({
        Symbol: record.Symbol,
        Quantity: record.Quantity,
        Price: record.Price,
        Category: record.Category,
      })
      setEditingKey(record.Symbol)
    },
    [form],
  )

  const cancel = React.useCallback(() => {
    setEditingKey('')
  }, [setEditingKey])

  const save = React.useCallback(
    async (key: string) => {
      try {
        const row = (await form.validateFields()) as Partial<InvestmentData>

        // Update the investment
        updateInvestment(key, row)
        setEditingKey('')
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo)
      }
    },
    [form, updateInvestment, setEditingKey],
  )

  const addNew = React.useCallback(() => {
    if (editingKey !== '') return // Don't allow adding if already editing

    setIsAddingNew(true)
    newInvestmentForm.setFieldsValue({
      Symbol: '',
      Quantity: 0,
      Price: 0,
      Category: '',
    })
  }, [newInvestmentForm, editingKey])

  const cancelAdd = React.useCallback(() => {
    setIsAddingNew(false)
  }, [])

  const saveNewInvestment = React.useCallback(async () => {
    try {
      const values = await newInvestmentForm.validateFields()

      // Add the new investment
      addInvestment(values)
      setIsAddingNew(false)
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }, [newInvestmentForm, addInvestment])

  // Define table columns with memoization to prevent unnecessary re-renders
  const columns = React.useMemo<EditableColumn<Investment>[]>(
    () => [
      {
        title: 'Symbol',
        dataIndex: 'Symbol',
        key: 'symbol',
        editable: true,
        width: '15%',
      },
      {
        title: 'Quantity',
        dataIndex: 'Quantity',
        key: 'quantity',
        editable: true,
        width: '15%',
        render: (quantity: number, record) => {
          return isEditing(record) ? null : quantity.toLocaleString()
        },
      },
      {
        title: 'Price',
        dataIndex: 'Price',
        key: 'price',
        editable: true,
        width: '15%',
        render: (price: number, record) => {
          return isEditing(record) ? null : formatCurrency(price)
        },
      },
      {
        title: 'Category',
        dataIndex: 'Category',
        key: 'category',
        editable: true,
        width: '15%',
      },
      {
        title: 'Value',
        dataIndex: 'Value',
        key: 'value',
        width: '15%',
        render: (value: number) => formatCurrency(value),
      },
      {
        title: 'Allocation',
        dataIndex: 'Allocation',
        key: 'allocation',
        width: '15%',
        render: (allocation: number) => formatPercent(allocation),
      },
      {
        title: 'Action',
        key: 'action',
        width: '10%',
        render: (_: unknown, record: Investment) => {
          const editable = isEditing(record)
          return editable ? (
            <span>
              <a
                href="#"
                onClick={() => save(record.Symbol)}
                style={{ marginRight: 8 }}
              >
                Save
              </a>
              <a href="#" onClick={cancel}>
                Cancel
              </a>
            </span>
          ) : (
            <a
              href="#"
              onClick={() => edit(record)}
              style={{
                pointerEvents: editingKey !== '' ? 'none' : 'auto',
                opacity: editingKey !== '' ? 0.5 : 1,
              }}
            >
              Edit
            </a>
          )
        },
      },
    ],
    [editingKey, isEditing, save, cancel, edit],
  )

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
            : col.dataIndex === 'Category'
              ? 'select'
              : 'text',
        dataIndex: col.dataIndex as string,
        title: col.title as string,
        editing: isEditing(record),
      }),
    }
  }) as ColumnsType<Investment>

  // Create combined data source with new investment row if adding
  const dataSource = React.useMemo(() => {
    if (isAddingNew) {
      return [...investments, newInvestmentRecord]
    }
    return investments
  }, [investments, isAddingNew, newInvestmentRecord])

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
            <a
              href="#"
              onClick={addNew}
              style={{
                pointerEvents:
                  editingKey !== '' || isAddingNew ? 'none' : 'auto',
                opacity: editingKey !== '' || isAddingNew ? 0.5 : 1,
              }}
            >
              Add
            </a>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    )
  }

  // Create components object with cell renderer and row renderer
  const components = {
    body: {
      cell: EditableCell,
      row: React.useCallback(
        (
          props: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            children: any[]
          } & React.HTMLAttributes<HTMLTableRowElement>,
        ) => {
          const record = props.children[0].props.record

          // If this is the new investment row being added
          if (isAddingNew && record.Symbol === newInvestmentRecord.Symbol) {
            return (
              <Form form={newInvestmentForm} component={false}>
                <tr {...props}>
                  {React.Children.map(props.children, (child) => {
                    // For action column
                    if (child.key === 'action') {
                      return React.cloneElement(child, {
                        children: (
                          <span>
                            <a
                              href="#"
                              onClick={saveNewInvestment}
                              style={{ marginRight: 8 }}
                            >
                              Save
                            </a>
                            <a href="#" onClick={cancelAdd}>
                              Cancel
                            </a>
                          </span>
                        ),
                      })
                    }

                    // For value and allocation columns - show empty cells
                    if (child.key === 'value' || child.key === 'allocation') {
                      return React.cloneElement(child, {
                        children: '',
                      })
                    }

                    // For editable cells
                    if (child.props.dataIndex) {
                      const dataIndex = child.props.dataIndex
                      const inputType =
                        dataIndex === 'Quantity' || dataIndex === 'Price'
                          ? 'number'
                          : 'text'

                      return (
                        <td>
                          <Form.Item
                            name={dataIndex}
                            style={{ margin: 0 }}
                            rules={[{ required: true }]}
                          >
                            {inputType === 'number' ? (
                              <InputNumber
                                min={0}
                                step={dataIndex === 'Price' ? 0.01 : 1}
                                precision={dataIndex === 'Price' ? 2 : 0}
                                style={{ width: '100%' }}
                              />
                            ) : (
                              <Input style={{ width: '100%' }} />
                            )}
                          </Form.Item>
                        </td>
                      )
                    }

                    return child
                  })}
                </tr>
              </Form>
            )
          }

          return <tr {...props} />
        },
        [
          isAddingNew,
          newInvestmentRecord,
          newInvestmentForm,
          saveNewInvestment,
          cancelAdd,
        ],
      ),
    },
  }

  return (
    <div style={{ width: '100%' }}>
      <Title level={2} style={{ marginBottom: '16px' }}>
        Investment Portfolio
      </Title>
      <Form form={form} component={false}>
        <Table
          components={components}
          columns={mergedColumns}
          dataSource={dataSource}
          rowKey="Symbol"
          pagination={false}
          summary={renderSummary}
        />
      </Form>
    </div>
  )
}
