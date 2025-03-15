# COASTFIRE

A personal investment portfolio tracker built with Next.js.

## Setup

### Investment Data

This application uses a JSON file to store investment data, which is excluded from version control for privacy.

1. Create a file at `src/app/data/investmentData.json`
2. Add your investment data in the following format:

```json
[
  {
    "Symbol": "VTI",
    "Quantity": 3316,
    "Price": 276.81,
    "Category": "Large Blend"
  },
  {
    "Symbol": "VTBSX",
    "Quantity": 3099,
    "Price": 104.49,
    "Category": "Intermediate Core Bond"
  }
]
```

Required fields for each investment:

- `Symbol`: The ticker symbol of the investment
- `Quantity`: Number of shares owned
- `Price`: Current price per share
- `Category`: Investment category/type

The application will automatically calculate:

- Value (Quantity × Price)
- Allocation (% of the total portfolio)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Technology

This project uses:

- Next.js for the frontend framework
- TypeScript for type safety
- Ant Design for UI components and styling
- [Geist](https://vercel.com/font) for typography

## Deployment

The application can be deployed on [Vercel](https://vercel.com/new) or any other platform that supports Next.js applications.
