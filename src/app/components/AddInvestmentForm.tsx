'use client'

import { useState } from 'react'
import { useInvestments } from '../context/InvestmentContext'
import { InvestmentData } from '../types'

interface AddInvestmentFormProps {
  className?: string
}

export default function AddInvestmentForm({ className = '' }: AddInvestmentFormProps) {
  const { addInvestment } = useInvestments()
  const [newInvestment, setNewInvestment] = useState<InvestmentData>({
    Symbol: '',
    Quantity: 0,
    Price: 0,
    Category: ''
  })
  const [formError, setFormError] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Handle numeric inputs
    if (name === 'Quantity' || name === 'Price') {
      const numberValue = parseFloat(value) || 0
      setNewInvestment({ ...newInvestment, [name]: numberValue })
    } else {
      setNewInvestment({ ...newInvestment, [name]: value })
    }
  }

  const handleSubmit = (e: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault()

    // Basic validation
    if (!newInvestment.Symbol || newInvestment.Quantity <= 0 || newInvestment.Price <= 0 || !newInvestment.Category) {
      setFormError('All fields are required. Quantity and Price must be greater than 0.')
      return
    }

    // Add the investment
    addInvestment(newInvestment)

    // Reset form
    setNewInvestment({
      Symbol: '',
      Quantity: 0,
      Price: 0,
      Category: ''
    })
    setFormError('')
  }

  // Handle keyboard events to submit form on Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  const cellClass = "py-2 px-4 border-b dark:border-gray-700"
  const inputClass = "w-full p-1 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"

  return (
    <tr className={`${className} bg-gray-50 dark:bg-gray-800`}>
      {formError && (
        <td colSpan={6} className={`${cellClass} text-red-500 text-sm`}>
          {formError}
        </td>
      )}
      {!formError && (
        <>
          <td className={cellClass}>
            <input
              type="text"
              name="Symbol"
              value={newInvestment.Symbol}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={inputClass}
              placeholder="Symbol"
            />
          </td>
          <td className={cellClass}>
            <input
              type="number"
              name="Quantity"
              value={newInvestment.Quantity || ''}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              min="0"
              step="any"
              className={inputClass}
              placeholder="Qty"
            />
          </td>
          <td className={cellClass}>
            <input
              type="number"
              name="Price"
              value={newInvestment.Price || ''}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              min="0"
              step="0.01"
              className={inputClass}
              placeholder="Price"
            />
          </td>
          <td className={cellClass}>
            <input
              type="text"
              name="Category"
              value={newInvestment.Category}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={inputClass}
              placeholder="Category"
            />
          </td>
          <td className={cellClass}>
            {/* Value will be calculated */}
          </td>
          <td className={cellClass}>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded transition duration-200"
            >
              Add
            </button>
          </td>
        </>
      )}
    </tr>
  )
}
