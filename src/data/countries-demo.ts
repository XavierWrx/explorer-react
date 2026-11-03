import type { Country } from '../types/country'

const paisUno: Country = {
  names: {
    common: 'El Salvador',
    official: 'República de El Salvador',
    translations: { spa: { common: 'El Salvador' } },
  },
  capitals: [{ name: 'San Salvador' }],
  codes: { alpha_2: 'SV', alpha_3: 'SLV' },
  flag: {
    url_svg: 'https://flagcdn.com/sv.svg',
    description: 'Bandera de El Salvador',
  },
  population: 6364943,
  region: 'América',
  subregion: 'América Central',
  tlds: ['.sv'],
  borders: ['GTM', 'HND'],
  area: { kilometers: 21041, miles: 8124 },
  coordinates: { lat: 13.8333, lng: -88.9167 },
  languages: [{ code: 'spa', name: 'Español', native_name: 'Español' }],
  currencies: [{ code: 'USD', name: 'Dólar estadounidense', symbol: '$' }],
}

const paisDos: Country = {
  names: {
    common: 'Guatemala',
    official: 'República de Guatemala',
    translations: { spa: { common: 'Guatemala' } },
  },
  capitals: [{ name: 'Ciudad de Guatemala' }],
  codes: { alpha_2: 'GT', alpha_3: 'GTM' },
  flag: {
    url_svg: 'https://flagcdn.com/gt.svg',
    description: 'Bandera de Guatemala',
  },
  population: 16858333,
  region: 'América',
  subregion: 'América Central',
  tlds: ['.gt'],
  borders: ['BLZ', 'SLV', 'HND', 'MEX'],
  area: { kilometers: 108889, miles: 42042 },
  coordinates: { lat: 15.5, lng: -90.25 },
  languages: [{ code: 'spa', name: 'Español', native_name: 'Español' }],
  currencies: [{ code: 'GTQ', name: 'Quetzal guatemalteco', symbol: 'Q' }],
}

const paisTres: Country = {
  names: {
    common: 'Honduras',
    official: 'República de Honduras',
    translations: { spa: { common: 'Honduras' } },
  },
  capitals: [{ name: 'Tegucigalpa' }],
  codes: { alpha_2: 'HN', alpha_3: 'HND' },
  flag: {
    url_svg: 'https://flagcdn.com/hn.svg',
    description: 'Bandera de Honduras',
  },
  population: 9904608,
  region: 'América',
  subregion: 'América Central',
  tlds: ['.hn'],
  borders: ['GTM', 'SLV', 'NIC'],
  area: { kilometers: 112492, miles: 43433 },
  coordinates: { lat: 15.0, lng: -86.5 },
  languages: [{ code: 'spa', name: 'Español', native_name: 'Español' }],
  currencies: [{ code: 'HNL', name: 'Lempira hondureño', symbol: 'L' }],
}

export const mockCountries: Country[] = [paisUno, paisDos, paisTres]

// countries-demo.ts — arreglo temporal para comprobar los componentes.
export const countriesDemo: Country[] = [
  paisUno, // Cambia estos nombres si tus variables se llaman elSalvador, japon, canada, etc.
  paisDos,
  paisTres
];
