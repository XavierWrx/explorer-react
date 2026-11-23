import type { JSX } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCountryDetail } from '../hooks/useCountryDetail';
import type { CountryDetail } from '../types/contry-detail';
import { getCountryRouteCode } from '../utils/country-codes';
import {
  formatCountryDetail,
  formatPopulation,
  getCapital,
  getFlagDescription,
  getRegionName,
} from '../utils/format';
import poblacionIcon from '../assets/Poblacion.svg';
import capitalIcon from '../assets/Capital.svg';
import regionIcon from '../assets/Region.svg';
import idiomaIcon from '../assets/Idioma.svg';
import areaIcon from '../assets/Area.svg';
import coordenadasIcon from '../assets/Coordenadas.svg';
import monedaIcon from '../assets/Moneda.svg';
import placeholderIcon from '../assets/Mosaico.svg';
import { FavoriteButton } from '../components/atoms/FavoriteButton';

interface CountryRouteParams {
  code: string;
}

interface CountryDetailContentProps {
  country: CountryDetail;
}

interface CountryInfoRowProps {
  icon?: string;
  label: string;
  value: string;
  iconAlt?: string;
}

function CountryInfoRow({
  icon,
  label,
  value,
  iconAlt = '',
}: CountryInfoRowProps): JSX.Element {
  return (
    <div className="grid grid-cols-[40px_110px_minmax(0,1fr)] items-center gap-2 py-2 sm:grid-cols-[40px_120px_minmax(0,1fr)]">
      {icon ? (
        <img
          src={icon}
          alt={iconAlt}
          className="h-6 w-6 object-contain"
          aria-hidden={iconAlt ? undefined : true}
        />
      ) : (
        <span aria-hidden="true" />
      )}
      <dt className="font-bold text-surface-icon-color">{label}</dt>
      <dd className="min-w-0 wrap-break-word">{value}</dd>
    </div>
  );
}

function CountryDetailContent({
  country,
}: CountryDetailContentProps): JSX.Element {
  const {
    nativeName,
    domains,
    currencies,
    languages,
    subregion,
    area,
    coordinates,
  } = formatCountryDetail(country);

  const borders: string[] = country.borders ?? [];

  return (
    <article className="mt-8 bg-surface-background rounded-rd-lg border border-brand-primary p-6 md:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
        <div className="flex items-center justify-center border border-brand-primary rounded-rd-sm bg-surface-color-background p-4">
          <img
            src={country.flag?.url_svg ?? placeholderIcon}
            alt={getFlagDescription(country)}
            className="aspect-3/2 w-full rounded-lg object-contain"
          />
        </div>

        <div className="min-w-0 font-roboto text-texto-secondary">
          <h1 className="text-3xl sm:text-4xl font-black text-surface-icon-color uppercase">
            {country.names.common}
          </h1>

          <h2 className="mt-8 text-lg font-black text-surface-icon-color">
            DATOS GENERALES
          </h2>

          <dl className="mt-2 grid gap-8 text-sm leading-6 sm:grid-cols-2">
            <div>
              <CountryInfoRow
                label="Nombre nativo:"
                value={nativeName}
              />
              <CountryInfoRow
                icon={poblacionIcon}
                label="Población:"
                value={formatPopulation(country.population)}
              />
              <CountryInfoRow
                icon={regionIcon}
                label="Región:"
                value={getRegionName(country.region)}
              />
              <CountryInfoRow
                icon={regionIcon}
                label="Subregión:"
                value={subregion}
              />
              <CountryInfoRow
                icon={capitalIcon}
                label="Capital:"
                value={getCapital(country)}
              />
            </div>
            <div>
              <CountryInfoRow
                label="Dominio:"
                value={domains}
              />
              <CountryInfoRow
                icon={monedaIcon}
                label="Moneda:"
                value={currencies}
              />
              <CountryInfoRow
                icon={idiomaIcon}
                label="Idiomas:"
                value={languages}
              />
              <CountryInfoRow
                icon={areaIcon}
                label="Área:"
                value={area}
              />
              <CountryInfoRow
                icon={coordenadasIcon}
                label="Coordenadas:"
                value={coordinates}
              />
            </div>
          </dl>

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
  const hasCode = Boolean(code?.trim());

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-orange-500 px-8 py-2 font-roboto font-bold text-neutral-900 hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        >
          ← Atrás
        </Link>
        {state.status === 'success' && (
          <FavoriteButton code={code ?? ''} variant="button" />
        )}
      </div>

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
          {hasCode ? (
            <button
              type="button"
              onClick={retry}
              className="mt-5 min-h-11 rounded-full bg-orange-500 px-6 py-2 font-bold text-neutral-900 hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Reintentar
            </button>
          ) : (
            <Link
              to="/"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-orange-500 px-6 py-2 font-bold text-neutral-900 hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            >
              Volver al listado
            </Link>
          )}
        </section>
      )}

      {state.status === 'success' && (
        <CountryDetailContent country={state.data} />
      )}
    </main>
  );
}

export default CountryDetailPage;