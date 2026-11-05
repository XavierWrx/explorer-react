import type { JSX } from 'react';
import type { Country } from '../../types/country';
import { CountryCard } from '../molecules/CountryCard';

interface CountryGridProps {
  countries: Country[];
  onSelect: (code: string) => void;
}

export function CountryGrid({ countries, onSelect }: CountryGridProps): JSX.Element {
  return (
    <section
      id="country-container"
      aria-label="Resultados de búsqueda"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
    >
      {countries.map((country) => (
        <CountryCard
          key={country.codes?.alpha_2 || country.names.common}
          country={country}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
}