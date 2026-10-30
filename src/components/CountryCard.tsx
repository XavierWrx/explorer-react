import type { Country } from '../types/country'
import { formatPopulation } from '../utils/format'

interface CountryCardProps {
  country: Country
  onSelect: (code: string) => void
}

function CountryCard({ country, onSelect }: CountryCardProps) {
  const countryName =
    country.names?.translations?.spa?.common || country.names?.common
  const flag =
    country.flag?.url_svg ||
    country.flag?.url_png ||
    '/src/assets/Mosaico.svg'

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <img
        src={flag}
        alt={`Bandera de ${countryName}`}
        className="h-48 w-full object-cover"
      />
      <div className="space-y-3 p-5">
        <h2 className="text-xl font-semibold">{countryName}</h2>
        <dl className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex justify-between gap-4">
            <dt className="font-medium">Población</dt>
            <dd>{formatPopulation(country.population)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-medium">Región</dt>
            <dd>{country.region}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-medium">Capital</dt>
            <dd>{country.capitals?.[0]?.name || 'Sin capital registrada'}</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={() =>
            onSelect(country.codes?.alpha_2 || country.names.common)
          }
          className="inline-flex rounded-md font-medium text-blue-700 underline-offset-4 hover:text-blue-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-blue-300 dark:hover:text-blue-200 dark:focus-visible:outline-blue-300"
        >
          Más información
        </button>
      </div>
    </article>
  )
}

export default CountryCard
