import type { Country, CountryResponse } from '../types/country';
import type { CountryDetail } from '../types/contry-detail';

const COUNTRIES_API_URL = '/api/countries';
const PAGE_SIZE = 100;
const RESPONSE_FIELDS = [
  'names',
  'codes',
  'capitals',
  'flag',
  'population',
  'region',
  'subregion',
  'area',
  'borders',
  'coordinates',
  'currencies',
  'languages',
  'tlds',
].join(',');

let countriesPromise: Promise<Country[]> | null = null;

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return typeof value === 'object' && value !== null
    ? (value as Record<string, unknown>)
    : undefined;
}

function isCountry(value: unknown): value is Country {
  const record = asRecord(value);
  const names = asRecord(record?.names);
  const codes = asRecord(record?.codes);

  return (
    typeof names?.common === 'string' &&
    typeof codes?.alpha_2 === 'string'
  );
}

function isCountryResponse(value: unknown): value is CountryResponse {
  const data = asRecord(asRecord(value)?.data);
  const meta = asRecord(data?.meta);

  return (
    Array.isArray(data?.objects) &&
    data.objects.every(isCountry) &&
    typeof meta?.total === 'number' &&
    typeof meta.count === 'number' &&
    typeof meta.limit === 'number' &&
    typeof meta.offset === 'number' &&
    typeof meta.more === 'boolean'
  );
}

async function readApiErrorCode(
  response: Response,
): Promise<string | undefined> {
  if (!response.headers.get('content-type')?.includes('application/json')) {
    return undefined;
  }

  const payload: unknown = await response.json().catch(() => undefined);
  const errors = asRecord(payload)?.errors;
  const firstError = Array.isArray(errors) ? asRecord(errors[0]) : undefined;

  return typeof firstError?.code === 'string' ? firstError.code : undefined;
}

async function fetchCountryPage(
  offset: number,
): Promise<CountryResponse['data']> {
  const query = new URLSearchParams({
    limit: String(PAGE_SIZE),
    offset: String(offset),
    response_fields: RESPONSE_FIELDS,
  });
  const response = await fetch(`${COUNTRIES_API_URL}?${query}`);

  if (!response.ok) {
    if (response.status === 403) {
      const errorCode = await readApiErrorCode(response);
      const codeLabel = errorCode ? ` (${errorCode})` : '';
      throw new Error(
        `REST Countries rechazó el acceso (HTTP 403${codeLabel}). Autoriza el hostname de la aplicación en la allowlist de la API key y verifica que la cuenta no esté congelada ni deshabilitada.`,
      );
    }

    throw new Error(
      `No se pudo cargar el catálogo de países (HTTP ${response.status}).`,
    );
  }

  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    throw new Error(
      `REST Countries devolvió una respuesta no JSON (content-type: ${contentType ?? 'no informado'}).`,
    );
  }

  const payload: unknown = await response.json();
  if (!isCountryResponse(payload)) {
    throw new Error('REST Countries devolvió un catálogo con formato no válido.');
  }

  return payload.data;
}

async function requestCountries(): Promise<Country[]> {
  const countries: Country[] = [];
  let offset = 0;
  let more = true;

  while (more) {
    const page = await fetchCountryPage(offset);
    if (page.objects.length === 0 && page.meta.more) {
      throw new Error('REST Countries devolvió una página vacía inesperada.');
    }

    countries.push(...page.objects);
    offset = page.meta.offset + page.meta.count;
    more = page.meta.more;
  }

  if (countries.length === 0) {
    throw new Error('REST Countries no devolvió países.');
  }

  return countries;
}

export function loadCountries(): Promise<Country[]> {
  if (!countriesPromise) {
    countriesPromise = requestCountries().catch((error: unknown): never => {
      countriesPromise = null;
      throw error;
    });
  }

  return countriesPromise;
}

export function fetchCountries(): Promise<Country[]> {
  return loadCountries();
}

export async function fetchCountryByCode(
  code: string,
): Promise<CountryDetail> {
  const normalizedCode = code.trim().toUpperCase();
  if (!normalizedCode) {
    throw new Error('No se indicó el código del país.');
  }

  const countries = await loadCountries();
  const country = countries.find(
    (item) => item.codes?.alpha_2?.toUpperCase() === normalizedCode,
  );

  if (!country) {
    throw new Error(`No se encontró el país con código ${normalizedCode}.`);
  }

  return country;
}
