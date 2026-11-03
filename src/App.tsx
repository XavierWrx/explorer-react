// App.tsx — compone la pantalla y define la acción de selección.
import { useState, type JSX } from 'react'
import { CountryGrid } from './components/organisms/CountryGrid'
import { Header } from './components/organisms/Header'
import { countriesDemo } from './data/countries-demo'
import type { Country } from './types/country'
import { filterCountries } from './utils/filter'

export default function App(): JSX.Element {
  const [query, setQuery] = useState<string>('')
  const [region, setRegion] = useState<string>('')

  const filteredCountries: Country[] = filterCountries(
    countriesDemo,
    query,
    region,
  )

  function handleSelect(code: string): void {
    // Comprobación temporal: el detalle se conectará con el enrutamiento.
    console.log('País seleccionado:', code)
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 text-neutral-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl">
        <Header title="Explora países del mundo">
          <p>Explorer App: migración de la interfaz a componentes React.</p>
        </Header>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="country-search" className="font-medium">
              Buscar país
            </label>
            <input
              id="country-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar país..."
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="region-filter" className="font-medium">
              Filtrar por región
            </label>
            <select
              id="region-filter"
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              <option value="">Todas las regiones</option>
              <option value="Africa">África</option>
              <option value="Americas">América</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europa</option>
              <option value="Oceania">Oceanía</option>
            </select>
          </div>
        </div>
        <p className="mb-4 text-sm text-neutral-600 dark:text-slate-300">
          Mostrando {filteredCountries.length} países
        </p>
        {filteredCountries.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="mb-4">No hay coincidencias</p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setRegion('')
              }}
              className="rounded-full bg-orange-500 px-5 py-2 font-medium text-neutral-900 transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <CountryGrid countries={filteredCountries} onSelect={handleSelect} />
        )}
      </div>
    </main>
  )
}
