import type { Country } from '../types/country'

const elSalvador: Country = {
  names: {
    common: 'El Salvador',
    official: 'Republic of El Salvador',
    translations: { spa: { common: 'El Salvador' } },
  },
  capitals: [{ name: 'San Salvador' }],
  codes: { alpha_2: 'SV', alpha_3: 'SLV' },
  flag: {
    url_svg: 'https://flagcdn.com/sv.svg',
    description: 'Bandera de El Salvador',
  },
  population: 6364943,
  region: 'Americas',
  subregion: 'Central America',
  tlds: ['.sv'],
  borders: ['GTM', 'HND'],
  area: { kilometers: 21041, miles: 8124 },
  coordinates: { lat: 13.8333, lng: -88.9167 },
  languages: [{ code: 'spa', name: 'Spanish', native_name: 'Español' }],
  currencies: [{ code: 'USD', name: 'United States dollar', symbol: '$' }],
}

const japan: Country = {
  names: {
    common: 'Japan', 
    official: 'Japan',
    translations: { spa: { common: 'Japón' } },
  },
  capitals: [{ name: 'Tokyo' }],
  codes: { alpha_2: 'JP', alpha_3: 'JPN' },
  flag: {
    url_svg: 'https://flagcdn.com/jp.svg',
    description: 'Bandera de Japón',
  },
  population: 125836021,
  region: 'Asia', 
  subregion: 'Eastern Asia',
  tlds: ['.jp'],
  borders: [],
  area: { kilometers: 377930, miles: 145920 },
  coordinates: { lat: 36.0, lng: 138.0 },
  languages: [{ code: 'jpn', name: 'Japanese', native_name: '日本語' }],
  currencies: [{ code: 'JPY', name: 'Japanese yen', symbol: '¥' }],
}

const canada: Country = {
  names: {
    common: 'Canada', 
    official: 'Canada',
    translations: { spa: { common: 'Canadá' } },
  },
  capitals: [{ name: 'Ottawa' }],
  codes: { alpha_2: 'CA', alpha_3: 'CAN' },
  flag: {
    url_svg: 'https://flagcdn.com/ca.svg',
    description: 'Bandera de Canadá',
  },
  population: 38005238,
  region: 'Americas', 
  subregion: 'North America',
  tlds: ['.ca'],
  borders: ['USA'],
  area: { kilometers: 9984670, miles: 3855100 },
  coordinates: { lat: 60.0, lng: -95.0 },
  languages: [{ code: 'eng', name: 'English', native_name: 'English' }],
  currencies: [{ code: 'CAD', name: 'Canadian dollar', symbol: '$' }],
}

export const countriesDemo: Country[] = [elSalvador, japan, canada];