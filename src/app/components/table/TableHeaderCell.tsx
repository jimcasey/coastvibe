'use client'

import React, { ReactNode } from 'react'

interface TableHeaderCellProps {
  children: ReactNode
  className?: string
}

export function TableHeaderCell({ children, className = '' }: TableHeaderCellProps) {
  return (
    <th className={`py-3 px-4 text-left font-semibold border-b dark:border-gray-700 ${className}`}>
      {children}
    </th>
  )
}
