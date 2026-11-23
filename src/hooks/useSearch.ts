import { useEffect, useState } from 'react';
import type { Country } from '../types/country';
import { filterCountries } from '../utils/filter';

export interface UseSearchReturn {
  query: string;
  setQuery: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
  visibleCountries: Country[];
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export function useSearch(countries: Country[]): UseSearchReturn {
  const [query, setQuery] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [debouncedRegion, setDebouncedRegion] = useState<string>('');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query);
      setDebouncedRegion(region);
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [query, region]);

  const hasActiveFilters =
    debouncedQuery.trim() !== '' || debouncedRegion.trim() !== '';
  const filteredCountries = filterCountries(
    countries,
    debouncedQuery,
    debouncedRegion,
  );

  const clearFilters = () => {
    setQuery('');
    setRegion('');
  };

  return {
    query,
    setQuery,
    region,
    setRegion,
    visibleCountries: filteredCountries,
    clearFilters,
    hasActiveFilters,
  };
}
