'use client'

import React from 'react'

interface TableTotalRowProps {
  label: string
  value: string
  percentage: string
  colSpan?: number
  className?: string
}

export function TableTotalRow({
  label,
  value,
  percentage,
  colSpan = 4,
  className = ''
}: TableTotalRowProps) {
  return (
    <tr className={`font-bold bg-gray-100 dark:bg-gray-700 ${className}`}>
      <td
        colSpan={colSpan}
        className="py-3 px-4 text-right border-t-2 border-gray-300 dark:border-gray-600"
      >
        {label}:
      </td>
      <td className="py-3 px-4 border-t-2 border-gray-300 dark:border-gray-600">
        {value}
      </td>
      <td className="py-3 px-4 border-t-2 border-gray-300 dark:border-gray-600">
        {percentage}
      </td>
    </tr>
  )
}
