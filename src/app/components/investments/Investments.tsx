'use client'

import { useInvestments } from '../../context/InvestmentContext'
import { formatCurrency, formatPercent } from '../../utils/format'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableTotalRow,
} from '../table/Table'
import AddInvestment from './AddInvestment'

export default function Investments() {
  const { investments, totalValue } = useInvestments()

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Investment Portfolio</h2>
      <Table>
        <TableHeader>
          <TableHeaderCell>Symbol</TableHeaderCell>
          <TableHeaderCell>Quantity</TableHeaderCell>
          <TableHeaderCell>Price</TableHeaderCell>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Value</TableHeaderCell>
          <TableHeaderCell>Allocation</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {investments.map((investment, index) => (
            <TableRow key={investment.Symbol} isEven={index % 2 === 0}>
              <TableCell>{investment.Symbol}</TableCell>
              <TableCell>{investment.Quantity.toLocaleString()}</TableCell>
              <TableCell>{formatCurrency(investment.Price)}</TableCell>
              <TableCell>{investment.Category}</TableCell>
              <TableCell>{formatCurrency(investment.Value)}</TableCell>
              <TableCell>{formatPercent(investment.Allocation)}</TableCell>
            </TableRow>
          ))}

          <AddInvestment />

          <TableTotalRow
            label="Total"
            value={formatCurrency(totalValue)}
            percentage="100%"
          />
        </TableBody>
      </Table>
    </div>
  )
}
