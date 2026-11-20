import { countriesDemo } from '../data/countries-demo';
import type { CountryDetail } from '../types/contry-detail';

export async function fetchCountryByCode(
  code: string,
  signal?: AbortSignal,
): Promise<CountryDetail> {
  await new Promise<void>((resolve) => {
    const timer = window.setTimeout(resolve, 150);
    signal?.addEventListener('abort', () => {
      window.clearTimeout(timer);
      resolve();
    }, { once: true });
  });

  if (signal?.aborted) {
    throw new DOMException('Country detail request cancelled', 'AbortError');
  }

  const country = countriesDemo.find(
    (item) => item.codes?.alpha_2?.toUpperCase() === code.toUpperCase(),
  );

  if (!country) {
    throw new Error(`No se encontró el país con código ${code.toUpperCase()}.`);
  }

  return country;
}
