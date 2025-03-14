'use client'

import React from 'react'

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
