import { useCallback, useEffect, useState } from 'react';
import type { Country } from '../types/country';
import { fetchCountries } from '../data/fetchCountries';

export type AppState =
  | { status: 'loading' }
  | { status: 'success'; data: Country[] }
  | { status: 'error'; message: string };

export interface UseCountriesReturn {
  state: AppState;
  retry: () => void;
}

export function useCountries(): UseCountriesReturn {
  const [state, setState] = useState<AppState>({ status: 'loading' });
  const [attempt, setAttempt] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    fetchCountries(controller.signal)
      .then((countries) => {
        if (!cancelled) {
          setState({ status: 'success', data: countries });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          const message = error instanceof Error
            ? error.message
            : 'No se pudieron cargar los países.';
          setState({ status: 'error', message });
        }
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ status: 'loading' });
    setAttempt((currentAttempt) => currentAttempt + 1);
  }, []);

  return { state, retry };
}
