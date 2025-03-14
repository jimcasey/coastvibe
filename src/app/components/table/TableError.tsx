'use client'

import React from 'react'

interface TableErrorProps {
  message: string
  colSpan: number
  className?: string
}

export function TableError({ message, colSpan, className = '' }: TableErrorProps) {
  return (
    <td colSpan={colSpan} className={`py-2 px-4 border-b dark:border-gray-700 text-red-500 text-sm ${className}`}>
      {message}
    </td>
  )
}
