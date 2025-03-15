'use client'

import React from 'react'

import investmentData from '../data/investmentData.json'
import { Investment, InvestmentData } from '../types'

// Define the context interface
interface InvestmentContextType {
  investments: Investment[]
  totalValue: number
  addInvestment: (investment: InvestmentData) => void
  updateInvestment: (symbol: string, updatedFields: Partial<InvestmentData>) => void
}

// Create the context with a default empty value
const InvestmentContext = React.createContext<InvestmentContextType>({
  investments: [],
  totalValue: 0,
  addInvestment: () => {},
  updateInvestment: () => {},
})

// Provider props interface
interface InvestmentProviderProps {
  children: React.ReactNode
}

/**
 * Calculates the value for each investment (price * quantity)
 */
const calculateInvestmentValues = (investments: InvestmentData[]): (InvestmentData & { Value: number })[] => {
  return investments.map((investment) => ({
    ...investment,
    Value: parseFloat((investment.Quantity * investment.Price).toFixed(2)),
  }))
}

/**
 * Calculates the portfolio total value
 */
const calculateTotalValue = (investments: { Value: number }[]): number => {
  return parseFloat(
    investments.reduce((total, investment) => total + investment.Value, 0).toFixed(2)
  )
}

/**
 * Calculates allocation percentages based on individual values and total
 */
const calculateAllocations = (
  investments: (InvestmentData & { Value: number })[],
  totalValue: number
): Investment[] => {
  return investments.map((investment) => ({
    ...investment,
    Allocation: parseFloat(
      ((investment.Value / totalValue) * 100).toFixed(2),
    ),
  }))
}

// Create the provider component
export const InvestmentProvider = ({ children }: InvestmentProviderProps) => {
  const seedData = investmentData as InvestmentData[]
  const [investmentList, setInvestmentList] = React.useState<InvestmentData[]>(seedData)

  // Use useMemo for derived state calculations to avoid unnecessary recalculations
  const { investments, totalValue } = React.useMemo(() => {
    const withValues = calculateInvestmentValues(investmentList)
    const total = calculateTotalValue(withValues)
    const withAllocations = calculateAllocations(withValues, total)

    return {
      investments: withAllocations,
      totalValue: total,
    }
  }, [investmentList])

  // Function to add a new investment
  const addInvestment = (newInvestment: InvestmentData): void => {
    setInvestmentList((prev) => [...prev, newInvestment])
  }

  // Function to update an existing investment
  const updateInvestment = (symbol: string, updatedFields: Partial<InvestmentData>): void => {
    setInvestmentList((prev) =>
      prev.map((investment) =>
        investment.Symbol === symbol
          ? { ...investment, ...updatedFields }
          : investment
      )
    )
  }

  // Create the context value object
  const contextValue = React.useMemo(
    () => ({
      investments,
      totalValue,
      addInvestment,
      updateInvestment,
    }),
    [investments, totalValue]
  )

  return (
    <InvestmentContext.Provider value={contextValue}>
      {children}
    </InvestmentContext.Provider>
  )
}

// Custom hook for using the investment context
export const useInvestments = (): InvestmentContextType => {
  const context = React.useContext(InvestmentContext)
  if (context === undefined) {
    throw new Error('useInvestments must be used within an InvestmentProvider')
  }
  return context
}
