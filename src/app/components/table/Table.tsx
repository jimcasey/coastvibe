'use client'

import React, { ReactNode } from 'react'

interface TableProps {
  children: ReactNode
  className?: string
}

export const Table = ({ children, className = '' }: TableProps) => {
  return (
    <div className={`overflow-x-auto w-full ${className}`}>
      <table className="min-w-full border-collapse">{children}</table>
    </div>
  )
}
