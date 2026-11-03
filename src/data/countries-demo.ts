import type { Country } from '../types/country'

const paisUno: Country = {
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
  region: 'Americas', // Cambiado a 'Americas' en inglés para el filtro
  subregion: 'Central America',
  tlds: ['.sv'],
  borders: ['GTM', 'HND'],
  area: { kilometers: 21041, miles: 8124 },
  coordinates: { lat: 13.8333, lng: -88.9167 },
  languages: [{ code: 'spa', name: 'Spanish', native_name: 'Español' }],
  currencies: [{ code: 'USD', name: 'United States dollar', symbol: '$' }],
}

const paisDos: Country = {
  names: {
    common: 'Japan', // Nombre en inglés como pide la guía
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
  region: 'Asia', // Región Asia para la prueba del filtro
  subregion: 'Eastern Asia',
  tlds: ['.jp'],
  borders: [],
  area: { kilometers: 377930, miles: 145920 },
  coordinates: { lat: 36.0, lng: 138.0 },
  languages: [{ code: 'jpn', name: 'Japanese', native_name: '日本語' }],
  currencies: [{ code: 'JPY', name: 'Japanese yen', symbol: '¥' }],
}

const paisTres: Country = {
  names: {
    common: 'Canada', // Nombre en inglés para buscar "can"
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
  region: 'Americas', // Cambiado a 'Americas' en inglés
  subregion: 'North America',
  tlds: ['.ca'],
  borders: ['USA'],
  area: { kilometers: 9984670, miles: 3855100 },
  coordinates: { lat: 60.0, lng: -95.0 },
  languages: [{ code: 'eng', name: 'English', native_name: 'English' }],
  currencies: [{ code: 'CAD', name: 'Canadian dollar', symbol: '$' }],
}

// countries-demo.ts — arreglo temporal para comprobar los componentes.
export const countriesDemo: Country[] = [
  paisUno, 
  paisDos,
  paisTres
];