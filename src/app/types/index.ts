// Investment data interface
export interface InvestmentData {
  Symbol: string
  Quantity: number
  Price: number
  Category: string
}

// Full investment data with calculated fields
export interface Investment extends InvestmentData {
  Value: number
  Allocation: number
}
