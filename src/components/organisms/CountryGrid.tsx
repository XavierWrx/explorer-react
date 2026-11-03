import type { Country } from '../../types/country'
import { CountryCard } from '../molecules/CountryCard'

interface CountryGridProps {
  countries: Country[]
  onSelect: (code: string) => void
}

export function CountryGrid({ countries, onSelect }: CountryGridProps) {
  return (
    <section
      id="paises"
      aria-label="Países destacados"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {countries.map((country) => (
        <CountryCard
          key={country.names.common}
          country={country}
          onSelect={onSelect}
        />
      ))}
    </section>
  )
}

export default CountryGrid
