import type { JSX } from 'react';
import { Link, useParams } from 'react-router-dom';
import placeholderIcon from '../assets/Mosaico.svg';
import { useCountries } from '../hooks/useCountries';

export function CountryDetailPage(): JSX.Element {
  const { code } = useParams<{ code: string }>();
  const { state, retry } = useCountries();

  if (state.status === 'loading') {
    return <p className="text-center py-12 font-roboto" role="status">Cargando país...</p>;
  }

  if (state.status === 'error') {
    return (
      <div className="text-center py-12">
        <p className="mb-4 font-roboto">{state.message}</p>
        <button
          type="button"
          onClick={retry}
          className="bg-brand-button-default hover:bg-brand-button-hover text-surface-icon-color font-roboto font-bold px-6 py-2 rounded-rd-sm"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const country = state.data.find(
    (item) => item.codes?.alpha_2?.toUpperCase() === code?.toUpperCase(),
  );

  if (!country) {
    return (
      <div className="text-center py-12">
        <p className="mb-4 font-roboto">No se encontró el país solicitado.</p>
        <Link
          to="/"
          className="bg-brand-button-default hover:bg-brand-button-hover text-surface-icon-color font-roboto font-bold px-6 py-2 rounded-rd-sm"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  const name = country.names.common;
  const flagUrl = country.flag?.url_svg ?? placeholderIcon;
  const capital = country.capitals?.[0]?.name ?? 'N/A';

  return (
    <section className="bg-surface-background rounded-rd-lg p-6 md:p-8 shadow-sm border border-brand-primary">
      <Link to="/" className="font-roboto font-bold text-brand-accent">
        ← Volver
      </Link>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src={flagUrl}
          alt={country.flag?.description ?? `Bandera de ${name}`}
          className="w-full max-h-80 object-contain"
        />
        <div>
          <h1 className="font-roboto font-black text-3xl text-surface-icon-color uppercase mb-4">
            {name}
          </h1>
          <p className="font-roboto text-texto-secondary">Capital: {capital}</p>
          <p className="font-roboto text-texto-secondary">Región: {country.region ?? 'No definida'}</p>
          <p className="font-roboto text-texto-secondary">
            Población: {country.population?.toLocaleString() ?? 'No disponible'}
          </p>
        </div>
      </div>
    </section>
  );
}
