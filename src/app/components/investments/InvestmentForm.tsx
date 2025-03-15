'use client'

import { useInvestments } from '../../context/InvestmentContext'
import { InvestmentData } from '../../types'
import { Form, Input, InputNumber, Button, Card } from 'antd'

interface InvestmentFormProps {
  className?: string
}

export const InvestmentForm = ({ className = '' }: InvestmentFormProps) => {
  const { addInvestment } = useInvestments()
  const [form] = Form.useForm()

  const onFinish = (values: InvestmentData) => {
    addInvestment(values)
    form.resetFields()
  }

  return (
    <Card title="Add New Investment" className={className}>
      <Form
        form={form}
        name="investment"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ Quantity: 0, Price: 0 }}
      >
        <Form.Item
          label="Symbol"
          name="Symbol"
          rules={[{ required: true, message: 'Please input the symbol!' }]}
        >
          <Input placeholder="e.g., VTI" />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="Quantity"
          rules={[
            { required: true, message: 'Please input the quantity!' },
            { type: 'number', min: 0, message: 'Quantity must be greater than 0!' }
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="e.g., 100"
            min={0}
            step={1}
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>

        <Form.Item
          label="Price"
          name="Price"
          rules={[
            { required: true, message: 'Please input the price!' },
            { type: 'number', min: 0, message: 'Price must be greater than 0!' }
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="e.g., 150.50"
            min={0}
            step={0.01}
            prefix="$"
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="Category"
          rules={[{ required: true, message: 'Please input the category!' }]}
        >
          <Input placeholder="e.g., Large Blend" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Investment
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}