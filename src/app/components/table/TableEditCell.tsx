'use client'

import React, { ReactNode } from 'react'

interface TableEditCellProps {
  children?: ReactNode
  className?: string
}

export const TableEditCell = ({
  children,
  className = '',
}: TableEditCellProps) => {
  return (
    <td className={`py-2 px-4 border-b dark:border-gray-700 ${className}`}>
      {children}
    </td>
  )
}
