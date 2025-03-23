'use client'

import React from 'react'

import portfolioData from '../data/portfolioData.json'
import { Investment, InvestmentData } from '../types'

// Define the context interface
interface PortfolioContextType {
  investments: Investment[]
  totalValue: number
  addInvestment: (investment: InvestmentData) => void
  updateInvestment: (
    symbol: string,
    updatedFields: Partial<InvestmentData>,
  ) => void
  deleteInvestment: (symbol: string) => void
}

// Create the context with a default empty value
const PortfolioContext = React.createContext<PortfolioContextType>({
  investments: [],
  totalValue: 0,
  addInvestment: () => {},
  updateInvestment: () => {},
  deleteInvestment: () => {},
})

// Provider props interface
interface PortfolioProviderProps {
  children: React.ReactNode
}

/**
 * Calculates the value for each investment (price * quantity)
 */
const calculateInvestmentValues = (
  investments: InvestmentData[],
): (InvestmentData & { Value: number })[] => {
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
    investments
      .reduce((total, investment) => total + investment.Value, 0)
      .toFixed(2),
  )
}

/**
 * Calculates allocation percentages based on individual values and total
 */
const calculateAllocations = (
  investments: (InvestmentData & { Value: number })[],
  totalValue: number,
): Investment[] => {
  return investments.map((investment) => ({
    ...investment,
    Allocation: parseFloat(((investment.Value / totalValue) * 100).toFixed(2)),
  }))
}

// Create the provider component
export const PortfolioProvider = ({ children }: PortfolioProviderProps) => {
  const seedData = portfolioData as InvestmentData[]
  const [investmentList, setInvestmentList] =
    React.useState<InvestmentData[]>(seedData)

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
  const updateInvestment = (
    symbol: string,
    updatedFields: Partial<InvestmentData>,
  ): void => {
    setInvestmentList((prev) =>
      prev.map((investment) =>
        investment.Symbol === symbol
          ? { ...investment, ...updatedFields }
          : investment,
      ),
    )
  }

  // Function to delete an investment
  const deleteInvestment = (symbol: string): void => {
    setInvestmentList((prev) =>
      prev.filter((investment) => investment.Symbol !== symbol),
    )
  }

  // Create the context value object
  const contextValue = React.useMemo(
    () => ({
      investments,
      totalValue,
      addInvestment,
      updateInvestment,
      deleteInvestment,
    }),
    [investments, totalValue],
  )

  return (
    <PortfolioContext.Provider value={contextValue}>
      {children}
    </PortfolioContext.Provider>
  )
}

// Custom hook for using the investment context
export const usePortfolio = (): PortfolioContextType => {
  const context = React.useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}
