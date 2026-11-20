import type { Country } from '../types/country';
import { countriesDemo } from './countries-demo';

export async function fetchCountries(signal?: AbortSignal): Promise<Country[]> {
  await new Promise<void>((resolve) => {
    const timer = window.setTimeout(resolve, 300);
    signal?.addEventListener('abort', () => {
      window.clearTimeout(timer);
      resolve();
    }, { once: true });
  });

  if (signal?.aborted) {
    throw new DOMException('Country request cancelled', 'AbortError');
  }

  return countriesDemo;
}
