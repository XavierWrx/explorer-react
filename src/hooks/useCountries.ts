import { useCallback, useEffect, useState } from 'react';
import { fetchCountries } from '../api/countries';
import type { Country } from '../types/country';

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
    let active = true;

    fetchCountries()
      .then((countries) => {
        if (active) {
          setState({ status: 'success', data: countries });
        }
      })
      .catch((error: unknown) => {
        if (active) {
          const message = error instanceof Error
            ? error.message
            : 'No se pudieron cargar los países.';
          setState({ status: 'error', message });
        }
      });

    return () => {
      active = false;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ status: 'loading' });
    setAttempt((currentAttempt) => currentAttempt + 1);
  }, []);

  return { state, retry };
}
