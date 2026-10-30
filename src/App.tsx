import CountryGrid from './components/CountryGrid'
import Footer from './components/Footer'
import Header from './components/Header'
import { mockCountries } from './data/countries-demo'

function App() {
  function handleCountrySelect(code: string) {
    console.log('País seleccionado:', code)
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header>
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <a
            id="inicio"
            href="#inicio"
            className="text-2xl font-bold tracking-tight"
          >
            Explorer App
          </a>
          <nav aria-label="Navegación principal" className="flex gap-5">
            <a className="hover:text-slate-300 hover:underline" href="#inicio">
              Inicio
            </a>
            <a className="hover:text-slate-300 hover:underline" href="#paises">
              Países
            </a>
          </nav>
        </div>
      </Header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
          Explora países
        </h1>
        <CountryGrid
          countries={mockCountries}
          onSelect={handleCountrySelect}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App
