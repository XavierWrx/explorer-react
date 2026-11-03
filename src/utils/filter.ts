import type { Country } from '../types/country'

export function filterCountries(
  countries: Country[],
  query: string,
  region: string,
): Country[] {
  const normalize = (value: string): string =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()

  const normalizeRegion = (value: string | null | undefined): string => {
    const normalized = normalize(value ?? '')
    const regionAliases: Record<string, string> = {
      africa: 'africa',
      americas: 'americas',
      america: 'americas',
      asia: 'asia',
      europe: 'europe',
      europa: 'europe',
      oceania: 'oceania',
    }

    return regionAliases[normalized] ?? normalized
  }

  const normalizedQuery = normalize(query)
  const normalizedSelectedRegion = normalizeRegion(region)

  return countries.filter((country) => {
    const countryNames = [
      country.names.common,
      country.names.official ?? '',
      country.names.translations?.spa?.common ?? '',
      country.names.translations?.spa?.official ?? '',
    ]

    const matchesQuery =
      normalizedQuery === '' ||
      countryNames.some((name) => normalize(name).includes(normalizedQuery)) ||
      normalizeRegion(country.region).includes(normalizedQuery)

    const matchesSelectedRegion =
      normalizedSelectedRegion === '' ||
      normalizeRegion(country.region) === normalizedSelectedRegion

    return matchesQuery && matchesSelectedRegion
  })
}