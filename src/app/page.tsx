import Investments from './components/investments/Investments'
import { InvestmentProvider } from './context/InvestmentContext'

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 gap-8 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-4">COASTVIBE</h1>
      </header>
      <main className="w-full max-w-6xl">
        <InvestmentProvider>
          <Investments />
        </InvestmentProvider>
      </main>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center w-full py-4"></footer>
    </div>
  )
}
