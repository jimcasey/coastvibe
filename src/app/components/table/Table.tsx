'use client'

import React, { ReactNode } from 'react'

interface TableProps {
  children: ReactNode
  className?: string
}

export function Table({ children, className = '' }: TableProps) {
  return (
    <div className={`overflow-x-auto w-full ${className}`}>
      <table className="min-w-full border-collapse">
        {children}
      </table>
    </div>
  )
}

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

interface TableBodyProps {
  children: ReactNode
  className?: string
}

export function TableBody({ children, className = '' }: TableBodyProps) {
  return <tbody className={className}>{children}</tbody>
}

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

interface TableEditCellProps {
  children?: ReactNode
  className?: string
}

export function TableEditCell({ children, className = '' }: TableEditCellProps) {
  return (
    <td className={`py-2 px-4 border-b dark:border-gray-700 ${className}`}>
      {children}
    </td>
  )
}

interface TableInputProps {
  type: string
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  placeholder?: string
  min?: string
  step?: string
  className?: string
}

export function TableInput({
  type,
  name,
  value,
  onChange,
  onKeyDown,
  placeholder,
  min,
  step,
  className = '',
}: TableInputProps) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      min={min}
      step={step}
      className={`w-full p-1 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 ${className}`}
      placeholder={placeholder}
    />
  )
}

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
