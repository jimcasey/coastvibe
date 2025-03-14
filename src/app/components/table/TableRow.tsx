'use client'

import React, { ReactNode } from 'react'

interface TableRowProps {
  children: ReactNode
  isEven?: boolean
  className?: string
}

export function TableRow({ children, isEven = true, className = '' }: TableRowProps) {
  const baseStyle = isEven
    ? 'bg-white dark:bg-gray-900'
    : 'bg-gray-50 dark:bg-gray-800'

  return (
    <tr className={`${baseStyle} ${className}`}>
      {children}
    </tr>
  )
}
