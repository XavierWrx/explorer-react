import type { JSX } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCountryDetail } from '../hooks/useCountryDetail';
import type { CountryDetail } from '../types/contry-detail';
import { getCountryRouteCode } from '../utils/country-codes';
import {
  formatPopulation,
  getCapital,
  getFlagDescription,
  getRegionName,
} from '../utils/format';

interface CountryRouteParams {
  code: string;
}

interface CountryDetailContentProps {
  country: CountryDetail;
}

function CountryDetailContent({
  country,
}: CountryDetailContentProps): JSX.Element {
  const nativeName: string =
    Object.values(country.names.native ?? {})
      .map((name): string => name?.official || name?.common || '')
      .find((name: string): boolean => name.length > 0) ??
    country.names.common;

  const domains: string =
    country.tlds?.filter(Boolean).join(', ') || 'No disponible';

  const currencies: string =
    country.currencies
      ?.map((currency): string => currency?.name ?? '')
      .filter((name: string): boolean => name.length > 0)
      .join(', ') || 'No disponible';

  const languages: string =
    country.languages
      ?.map((language): string => language?.name ?? '')
      .filter((name: string): boolean => name.length > 0)
      .join(', ') || 'No disponible';

  const borders: string[] = country.borders ?? [];

  return (
    <article className="mt-8 bg-surface-background rounded-rd-lg border border-brand-primary p-6 md:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
        <div className="flex items-center justify-center border border-brand-primary rounded-rd-sm bg-surface-color-background p-4">
          <img
            src={country.flag?.url_svg ?? '/src/assets/Mosaico.svg'}
            alt={getFlagDescription(country)}
            className="aspect-3/2 w-full rounded-lg object-contain"
          />
        </div>

        <div className="min-w-0 font-roboto text-texto-secondary">
          <h1 className="text-3xl sm:text-4xl font-black text-surface-icon-color uppercase">
            {country.names.common}
          </h1>

          <div className="mt-8 grid gap-8 text-sm leading-6 sm:grid-cols-2">
            <dl className="space-y-2">
              <div>
                <dt className="inline font-bold">Nombre nativo: </dt>
                <dd className="inline wrap-break-word">{nativeName}</dd>
              </div>
              <div>
                <dt className="inline font-bold">Población: </dt>
                <dd className="inline">
                  {formatPopulation(country.population)}
                </dd>
              </div>
              <div>
                <dt className="inline font-bold">Región: </dt>
                <dd className="inline">{getRegionName(country.region)}</dd>
              </div>
              <div>
                <dt className="inline font-bold">Subregión: </dt>
                <dd className="inline">
                  {country.subregion || 'No disponible'}
                </dd>
              </div>
              <div>
                <dt className="inline font-bold">Capital: </dt>
                <dd className="inline">{getCapital(country)}</dd>
              </div>
            </dl>

            <dl className="space-y-2">
              <div>
                <dt className="inline font-bold">Dominio: </dt>
                <dd className="inline wrap-break-word">{domains}</dd>
              </div>
              <div>
                <dt className="inline font-bold">Moneda: </dt>
                <dd className="inline">{currencies}</dd>
              </div>
              <div>
                <dt className="inline font-bold">Idiomas: </dt>
                <dd className="inline">{languages}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <h2 className="text-sm font-bold text-surface-icon-color">
              Países fronterizos:
            </h2>
            {borders.length === 0 ? (
              <p className="text-sm">Sin fronteras terrestres.</p>
            ) : (
              borders.map((borderCode: string): JSX.Element => {
                const borderRouteCode: string | undefined =
                  getCountryRouteCode(borderCode);

                return borderRouteCode ? (
                  <Link
                    key={borderCode}
                    to={`/country/${encodeURIComponent(borderRouteCode)}`}
                    className="inline-flex min-h-11 min-w-16 items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-bold text-neutral-900 shadow-sm border border-brand-primary hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                    aria-label={`Ver país fronterizo ${borderCode}`}
                  >
                    {borderCode}
                  </Link>
                ) : (
                  <span
                    key={borderCode}
                    className="rounded-lg border border-brand-primary px-4 py-2 text-sm"
                  >
                    {borderCode} (no disponible)
                  </span>
                );
              })
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function CountryDetailPage(): JSX.Element {
  const { code } = useParams<keyof CountryRouteParams>();
  const { state, retry } = useCountryDetail(code);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-orange-500 px-8 py-2 font-roboto font-bold text-neutral-900 hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
      >
        ← Atrás
      </Link>

      {state.status === 'loading' && (
        <p role="status" className="mt-12 font-roboto">
          Cargando información del país...
        </p>
      )}

      {state.status === 'error' && (
        <section className="mt-12 rounded-rd-lg border border-brand-primary bg-surface-background p-6 font-roboto">
          <h1 className="text-2xl font-bold text-surface-icon-color">
            No se pudo mostrar el país
          </h1>
          <p role="alert" className="mt-3 text-texto-secondary">
            {state.message}
          </p>
          <button
            type="button"
            onClick={retry}
            className="mt-5 min-h-11 rounded-full bg-orange-500 px-6 py-2 font-bold text-neutral-900 hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Reintentar
          </button>
        </section>
      )}

      {state.status === 'success' && (
        <CountryDetailContent country={state.data} />
      )}
    </main>
  );
}

export default CountryDetailPage;