'use client'

import React from 'react'

import { Portfolio } from '../components/portfolio'
import { PortfolioProvider } from '../context'

export const PortfolioPage = () => {
  return (
    <PortfolioProvider>
      <Portfolio />
    </PortfolioProvider>
  )
}

export default PortfolioPage
