'use client'

import { useInvestments } from '../context/InvestmentContext'
import { formatCurrency, formatPercent } from '../utils/format'

export default function FinancialTable() {
  const { investments, totalValue } = useInvestments()

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
