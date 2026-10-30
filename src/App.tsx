import CountryCard from './components/CountryCard'
import { paisDos, paisTres, paisUno } from './data/countries-demo'

function App() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
        Explorer App
      </h1>
      <section
        aria-label="Países destacados"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <CountryCard country={paisUno} />
        <CountryCard country={paisDos} />
        <CountryCard country={paisTres} />
      </section>
    </main>
  )
}

export default App
