import { useCallback, useEffect, useState } from 'react';
import { fetchCountryByCode } from '../api/countries';
import type { CountryDetail } from '../types/contry-detail';

export type CountryDetailState =
  | { status: 'loading' }
  | { status: 'success'; data: CountryDetail }
  | { status: 'error'; message: string };

interface DetailRequest {
  code: string;
  state: CountryDetailState;
}

export interface UseCountryDetailReturn {
  state: CountryDetailState;
  retry: () => void;
}

export function useCountryDetail(
  code: string | undefined,
): UseCountryDetailReturn {
  const normalizedCode = code?.trim().toUpperCase() ?? '';
  const [attempt, setAttempt] = useState<number>(0);
  const [request, setRequest] = useState<DetailRequest>({
    code: '',
    state: { status: 'loading' },
  });

  useEffect(() => {
    if (!normalizedCode) return;

    let active = true;

    async function loadDetail(): Promise<void> {
      try {
        const country: CountryDetail = await fetchCountryByCode(
          normalizedCode,
        );

        if (active) {
          setRequest({
            code: normalizedCode,
            state: { status: 'success', data: country },
          });
        }
      } catch (error: unknown) {
        if (active) {
          setRequest({
            code: normalizedCode,
            state: {
              status: 'error',
              message:
                error instanceof Error
                  ? error.message
                  : 'No fue posible cargar el detalle del país.',
            },
          });
        }
      }
    }

    void loadDetail();

    return () => {
      active = false;
    };
  }, [normalizedCode, attempt]);

  const retry = useCallback(() => {
    setRequest({ code: normalizedCode, state: { status: 'loading' } });
    setAttempt((currentAttempt) => currentAttempt + 1);
  }, [normalizedCode]);

  if (!normalizedCode) {
    return {
      state: { status: 'error', message: 'No se indicó el código del país.' },
      retry,
    };
  }

  const state: CountryDetailState =
    request.code === normalizedCode
      ? request.state
      : { status: 'loading' };

  return { state, retry };
}