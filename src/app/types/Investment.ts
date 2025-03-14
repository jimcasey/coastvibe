import { InvestmentData } from './InvestmentData'

// Full investment data with calculated fields
export interface Investment extends InvestmentData {
  Value: number
  Allocation: number
}
