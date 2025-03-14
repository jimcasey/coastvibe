'use client'

import React, { ReactNode } from 'react'

interface TableCellProps {
  children: ReactNode
  className?: string
}

export function TableCell({ children, className = '' }: TableCellProps) {
  return (
    <td className={`py-2 px-4 border-b dark:border-gray-700 ${className}`}>
      {children}
    </td>
  )
}
