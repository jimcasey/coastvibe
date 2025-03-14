'use client'

import React, { ReactNode } from 'react'

interface TableHeaderProps {
  children: ReactNode
  className?: string
}

export function TableHeader({ children, className = '' }: TableHeaderProps) {
  return (
    <thead className={`bg-gray-100 dark:bg-gray-800 ${className}`}>
      <tr>{children}</tr>
    </thead>
  )
}
