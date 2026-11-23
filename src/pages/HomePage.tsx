import { useState, type JSX } from 'react';
import { CountryGrid } from '../components/organisms/CountryGrid';
import { Header } from '../components/organisms/Header';
import { useCountries } from '../hooks/useCountries';
import { useFavorites } from '../hooks/useFavorites';
import { useSearch } from '../hooks/useSearch';

const COUNTRIES_PER_BATCH = 4;

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

interface EmptyStateProps {
  onClearFilters: () => void;
}

function LoadingState(): JSX.Element {
  return (
    <div className="py-12 text-center" role="status">
      <p className="font-roboto text-lg text-surface-icon-color">
        Cargando países...
      </p>
    </div>
  );
}

function ErrorState({ message, onRetry }: ErrorStateProps): JSX.Element {
  return (
    <div className="py-12 text-center">
      <p className="mb-4 font-roboto text-lg text-surface-icon-color" role="alert">
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="cursor-pointer rounded-rd-sm bg-brand-button-default px-6 py-2 font-roboto font-bold text-surface-icon-color shadow-sm transition-all hover:bg-brand-button-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
      >
        Reintentar
      </button>
    </div>
  );
}

function EmptyState({ onClearFilters }: EmptyStateProps): JSX.Element {
  return (
    <div className="py-12 text-center">
      <p className="mb-4 font-roboto text-lg text-surface-icon-color">
        No se encontraron países que coincidan con tu búsqueda.
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="cursor-pointer rounded-rd-sm bg-brand-button-default px-6 py-2 font-roboto font-bold text-surface-icon-color shadow-sm transition-all hover:bg-brand-button-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
      >
        Limpiar filtros
      </button>
    </div>
  );
}

export function HomePage(): JSX.Element {
  const { state, retry } = useCountries();
  const countries = state.status === 'success' ? state.data : [];
  const {
    query,
    setQuery,
    region,
    setRegion,
    visibleCountries,
    clearFilters,
    hasActiveFilters,
  } = useSearch(countries);
  const { isFavorite, favoritesCount } = useFavorites();
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(COUNTRIES_PER_BATCH);
  const displayedCountries = onlyFavorites
    ? visibleCountries.filter((country) =>
        isFavorite(country.codes?.alpha_2 ?? ''),
      )
    : visibleCountries;
  const countriesToShow = displayedCountries.slice(0, visibleCount);
  const nextBatchCount = Math.min(
    COUNTRIES_PER_BATCH,
    displayedCountries.length - countriesToShow.length,
  );

  const resetVisibleCount = (): void => {
    setVisibleCount(COUNTRIES_PER_BATCH);
  };

  const handleSearch = (value: string): void => {
    resetVisibleCount();
    setQuery(value);
  };

  const handleRegionChange = (value: string): void => {
    resetVisibleCount();
    setRegion(value);
  };

  const handleClearFilters = (): void => {
    resetVisibleCount();
    clearFilters();
  };

  const handleToggleFavorites = (): void => {
    resetVisibleCount();
    setOnlyFavorites((current) => !current);
  };

  return (
    <div>
      <Header
        title="EXPLORAR PAÍSES DEL MUNDO"
        query={query}
        onSearch={handleSearch}
        region={region}
        onRegionChange={handleRegionChange}
      >
        <p>Aprende lo más importante</p>
      </Header>

      {state.status === 'loading' && <LoadingState />}
      {state.status === 'error' && (
        <ErrorState message={state.message} onRetry={retry} />
      )}
      {state.status === 'success' && (
        <>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 font-roboto font-bold text-texto-secondary">
            <p>
              Mostrando {countriesToShow.length} de {displayedCountries.length}{' '}
              países
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {hasActiveFilters && displayedCountries.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="min-h-11 rounded-rd-sm border border-brand-primary px-4 py-2 text-sm text-surface-icon-color transition-colors hover:bg-surface-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
                >
                  Limpiar filtros
                </button>
              )}
              <button
                type="button"
                aria-pressed={onlyFavorites}
                onClick={handleToggleFavorites}
                className="inline-flex min-h-11 items-center gap-2 rounded-rd-sm border border-brand-button-border-gold bg-brand-button-default px-4 py-2 text-sm text-surface-icon-color shadow-sm transition-colors hover:bg-brand-button-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
              >
                ★ Solo favoritas ({favoritesCount})
              </button>
            </div>
          </div>

          {onlyFavorites && displayedCountries.length === 0 ? (
            <div className="py-12 text-center">
              <p className="mb-4 font-roboto text-lg text-surface-icon-color">
                {favoritesCount === 0
                  ? 'Aún no tienes banderas favoritas.'
                  : 'Tus banderas favoritas no coinciden con los filtros actuales.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  resetVisibleCount();
                  setOnlyFavorites(false);
                }}
                className="rounded-rd-sm bg-brand-button-default px-6 py-2 font-roboto font-bold text-surface-icon-color shadow-sm transition-all hover:bg-brand-button-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
              >
                Ver todos los países
              </button>
            </div>
          ) : displayedCountries.length === 0 ? (
            <EmptyState onClearFilters={handleClearFilters} />
          ) : (
            <>
              <CountryGrid countries={countriesToShow} />
              {nextBatchCount > 0 && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    aria-controls="country-container"
                    onClick={() =>
                      setVisibleCount((current) => current + COUNTRIES_PER_BATCH)
                    }
                    className="min-h-11 rounded-rd-sm bg-brand-button-default px-6 py-3 font-roboto font-bold text-surface-icon-color shadow-sm transition-colors hover:bg-brand-button-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
                  >
                    Mostrar {nextBatchCount}{' '}
                    {nextBatchCount === 1 ? 'país más' : 'países más'}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default HomePage;
