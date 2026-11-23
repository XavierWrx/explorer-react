import type { JSX } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Header } from './components/organisms/Header';
import { CountryGrid } from './components/organisms/CountryGrid';
import { Footer } from './components/organisms/Footer';
import { useCountries } from './hooks/useCountries';
import { useSearch } from './hooks/useSearch';
import { CountryDetailPage } from './pages/CountryDetailPage';
// [FEATURE: FAVORITES] START
import { useState } from 'react';
import { useFavorites } from './hooks/useFavorites';
// [FEATURE: FAVORITES] END

export function LoadingState(): JSX.Element {
  return (
    <div className="text-center py-12" role="status">
      <p className="font-roboto text-lg text-surface-icon-color">
        Cargando países...
      </p>
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}): JSX.Element {
  return (
    <div className="text-center py-12">
      <p className="font-roboto text-lg mb-4 text-surface-icon-color">
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="bg-brand-button-default hover:bg-brand-button-hover active:scale-95 text-surface-icon-color font-roboto font-bold px-6 py-2 rounded-rd-sm transition-all shadow-sm cursor-pointer"
      >
        Reintentar
      </button>
    </div>
  );
}

export function EmptyState({
  onClearFilters,
}: {
  onClearFilters: () => void;
}): JSX.Element {
  return (
    <div className="text-center py-12">
      <p className="font-roboto text-lg mb-4 text-surface-icon-color">
        No se encontraron países que coincidan con tu búsqueda.
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="bg-brand-button-default hover:bg-brand-button-hover active:scale-95 text-surface-icon-color font-roboto font-bold px-6 py-2 rounded-rd-sm transition-all shadow-sm cursor-pointer"
      >
        Limpiar filtros
      </button>
    </div>
  );
}

export function App(): JSX.Element {
  const navigate = useNavigate();
  const { state, retry } = useCountries();
  const countries = state.status === 'success' ? state.data : [];
  // [FEATURE: FAVORITES] START
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const { isFavorite, favoritesCount } = useFavorites();
  // [FEATURE: FAVORITES] END
  const {
    query,
    setQuery,
    region,
    setRegion,
    visibleCountries,
    clearFilters,
  } = useSearch(countries);
  // [FEATURE: FAVORITES] START
  const displayedCountries = onlyFavorites
    ? visibleCountries.filter((country) =>
        isFavorite(country.codes?.alpha_2 ?? '')
      )
    : visibleCountries;
  // [FEATURE: FAVORITES] END

  const handleSelect = (code: string): void => {
    navigate(`/country/${encodeURIComponent(code)}`);
  };

  return (
    <main className="min-h-screen bg-surface-color-background text-texto-secondary flex flex-col justify-between">
      <div className="mx-auto max-w-7xl w-full px-4 py-8 flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  title="EXPLORAR PAÍSES DEL MUNDO"
                  query={query}
                  onSearch={setQuery}
                  region={region}
                  onRegionChange={setRegion}
                >
                  <p>Aprende lo más importante</p>
                </Header>
                {state.status === 'loading' && <LoadingState />}
                {state.status === 'error' && (
                  <ErrorState message={state.message} onRetry={retry} />
                )}
                {state.status === 'success' && (
                  <>
                    {/* [FEATURE: FAVORITES] START */}
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 font-roboto font-bold text-texto-secondary">
                      <p>Mostrando {displayedCountries.length} países</p>
                      <button
                        type="button"
                        aria-pressed={onlyFavorites}
                        onClick={() => setOnlyFavorites((current: boolean) => !current)}
                        className="inline-flex min-h-11 items-center gap-2 rounded-rd-sm border border-brand-button-border-gold bg-brand-button-default px-4 py-2 text-sm text-surface-icon-color shadow-sm transition-colors hover:bg-brand-button-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
                      >
                        ★ Solo favoritas ({favoritesCount})
                      </button>
                    </div>
                    {/* [FEATURE: FAVORITES] END */}
                    {onlyFavorites && displayedCountries.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="font-roboto text-lg mb-4 text-surface-icon-color">
                          {favoritesCount === 0
                            ? 'Aún no tienes banderas favoritas.'
                            : 'Tus banderas favoritas no coinciden con los filtros actuales.'}
                        </p>
                        <button
                          type="button"
                          onClick={() => setOnlyFavorites(false)}
                          className="bg-brand-button-default hover:bg-brand-button-hover active:scale-95 text-surface-icon-color font-roboto font-bold px-6 py-2 rounded-rd-sm transition-all shadow-sm cursor-pointer"
                        >
                          Ver todos los países
                        </button>
                      </div>
                    ) : displayedCountries.length === 0 ? (
                      <EmptyState onClearFilters={clearFilters} />
                    ) : (
                      <CountryGrid
                        countries={displayedCountries}
                        onSelect={handleSelect}
                      />
                    )}
                  </>
                )}
              </>
            }
          />
          <Route path="/country/:code" element={<CountryDetailPage />} />
          <Route path="/pais/:code" element={<CountryDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}
export default App;