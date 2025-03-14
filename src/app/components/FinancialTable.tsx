'use client'

import { useState, useEffect } from 'react'
import investmentData from '../data/investmentData.json'
import { Investment, InvestmentData } from '../types'

export default function FinancialTable() {
  // Use the external JSON data
  const seedData = investmentData as InvestmentData[]

  const [investments, setInvestments] = useState<Investment[]>([])
  const [totalValue, setTotalValue] = useState<number>(0)

  useEffect(() => {
    // Calculate Value for each investment
    const investmentsWithValue = seedData.map((investment) => ({
      ...investment,
      Value: parseFloat((investment.Quantity * investment.Price).toFixed(2)),
      Allocation: 0, // Temporary placeholder
    }))

    // Calculate total portfolio value
    const portfolioTotal = investmentsWithValue.reduce(
      (total, investment) => total + investment.Value,
      0,
    )

    // Calculate allocation percentages
    const completeInvestments = investmentsWithValue.map((investment) => ({
      ...investment,
      Allocation: parseFloat(
        ((investment.Value / portfolioTotal) * 100).toFixed(2),
      ),
    }))

    setInvestments(completeInvestments)
    setTotalValue(parseFloat(portfolioTotal.toFixed(2)))
  }, [seedData])

  // Format numbers for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value}%`
  }

  return (
    <div className="overflow-x-auto w-full">
      <h2 className="text-2xl font-bold mb-4">Investment Portfolio</h2>
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="py-3 px-4 text-left font-semibold border-b dark:border-gray-700">
              Symbol
            </th>
            <th className="py-3 px-4 text-left font-semibold border-b dark:border-gray-700">
              Quantity
            </th>
            <th className="py-3 px-4 text-left font-semibold border-b dark:border-gray-700">
              Price
            </th>
            <th className="py-3 px-4 text-left font-semibold border-b dark:border-gray-700">
              Category
            </th>
            <th className="py-3 px-4 text-left font-semibold border-b dark:border-gray-700">
              Value
            </th>
            <th className="py-3 px-4 text-left font-semibold border-b dark:border-gray-700">
              Allocation
            </th>
          </tr>
        </thead>
        <tbody>
          {investments.map((investment, index) => (
            <tr
              key={investment.Symbol}
              className={
                index % 2 === 0
                  ? 'bg-white dark:bg-gray-900'
                  : 'bg-gray-50 dark:bg-gray-800'
              }
            >
              <td className="py-2 px-4 border-b dark:border-gray-700">
                {investment.Symbol}
              </td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                {investment.Quantity.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                {formatCurrency(investment.Price)}
              </td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                {investment.Category}
              </td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                {formatCurrency(investment.Value)}
              </td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                {formatPercent(investment.Allocation)}
              </td>
            </tr>
          ))}
          <tr className="font-bold bg-gray-100 dark:bg-gray-700">
            <td
              colSpan={4}
              className="py-3 px-4 text-right border-t-2 border-gray-300 dark:border-gray-600"
            >
              Total:
            </td>
            <td className="py-3 px-4 border-t-2 border-gray-300 dark:border-gray-600">
              {formatCurrency(totalValue)}
            </td>
            <td className="py-3 px-4 border-t-2 border-gray-300 dark:border-gray-600">
              100%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
