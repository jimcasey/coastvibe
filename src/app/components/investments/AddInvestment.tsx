'use client'

import { useState } from 'react'
import { useInvestments } from '../../context/InvestmentContext'
import { InvestmentData } from '../../types'
import { TableInput, TableEditCell, TableError } from '../../components/table'

interface AddInvestmentProps {
  className?: string
}

export const AddInvestment = ({ className = '' }: AddInvestmentProps) => {
  const { addInvestment } = useInvestments()
  const [newInvestment, setNewInvestment] = useState<InvestmentData>({
    Symbol: '',
    Quantity: 0,
    Price: 0,
    Category: '',
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
    if (
      !newInvestment.Symbol ||
      newInvestment.Quantity <= 0 ||
      newInvestment.Price <= 0 ||
      !newInvestment.Category
    ) {
      setFormError(
        'All fields are required. Quantity and Price must be greater than 0.',
      )
      return
    }

    // Add the investment
    addInvestment(newInvestment)

    // Reset form
    setNewInvestment({
      Symbol: '',
      Quantity: 0,
      Price: 0,
      Category: '',
    })
    setFormError('')
  }

  // Handle keyboard events to submit form on Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <tr className={`${className} bg-gray-50 dark:bg-gray-800`}>
      {formError && <TableError message={formError} colSpan={6} />}
      {!formError && (
        <>
          <TableEditCell>
            <TableInput
              type="text"
              name="Symbol"
              value={newInvestment.Symbol}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Symbol"
            />
          </TableEditCell>
          <TableEditCell>
            <TableInput
              type="number"
              name="Quantity"
              value={newInvestment.Quantity || ''}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              min="0"
              step="any"
              placeholder="Qty"
            />
          </TableEditCell>
          <TableEditCell>
            <TableInput
              type="number"
              name="Price"
              value={newInvestment.Price || ''}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              min="0"
              step="0.01"
              placeholder="Price"
            />
          </TableEditCell>
          <TableEditCell>
            <TableInput
              type="text"
              name="Category"
              value={newInvestment.Category}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Category"
            />
          </TableEditCell>
          <TableEditCell>
            {/* Cell left intentionally empty for calculated value */}
          </TableEditCell>
          <TableEditCell>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded transition duration-200"
            >
              Add
            </button>
          </TableEditCell>
        </>
      )}
    </tr>
  )
}
