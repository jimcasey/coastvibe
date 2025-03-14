'use client'

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react'
import investmentData from '../data/investmentData.json'
import { Investment, InvestmentData } from '../types'

// Define the context interface
interface InvestmentContextType {
  investments: Investment[]
  totalValue: number
  addInvestment: (investment: InvestmentData) => void
}

// Create the context with a default value
const InvestmentContext = createContext<InvestmentContextType | undefined>(
  undefined,
)

// Provider props interface
interface InvestmentProviderProps {
  children: ReactNode
}

// Create the provider component
export const InvestmentProvider = ({ children }: InvestmentProviderProps) => {
  const seedData = investmentData as InvestmentData[]
  const [investments, setInvestments] = useState<Investment[]>([])
  const [totalValue, setTotalValue] = useState<number>(0)

  // Function to calculate values and allocations
  const recalculatePortfolio = (investmentList: InvestmentData[]) => {
    // Calculate Value for each investment
    const investmentsWithValue = investmentList.map((investment) => ({
      ...investment,
      Value: parseFloat((investment.Quantity * investment.Price).toFixed(2)),
      Allocation: 0, // Temporary placeholder
    }))

    // Calculate total portfolio value
    const portfolioTotal = investmentsWithValue.reduce(
      (total, investment) => total + investment.Value,
      0,
    )

    // Calculate allocation percentages
    const completeInvestments = investmentsWithValue.map((investment) => ({
      ...investment,
      Allocation: parseFloat(
        ((investment.Value / portfolioTotal) * 100).toFixed(2),
      ),
    }))

    setInvestments(completeInvestments)
    setTotalValue(parseFloat(portfolioTotal.toFixed(2)))
  }

  useEffect(() => {
    recalculatePortfolio(seedData)
  }, [seedData])

  // Function to add a new investment
  const addInvestment = (newInvestment: InvestmentData) => {
    const updatedInvestments = [...investments, newInvestment]
    recalculatePortfolio(updatedInvestments)
  }

  // Create the context value object
  const contextValue: InvestmentContextType = {
    investments,
    totalValue,
    addInvestment,
  }

  return (
    <InvestmentContext.Provider value={contextValue}>
      {children}
    </InvestmentContext.Provider>
  )
}

// Custom hook for using the investment context
export const useInvestments = () => {
  const context = useContext(InvestmentContext)
  if (context === undefined) {
    throw new Error('useInvestments must be used within an InvestmentProvider')
  }
  return context
}
