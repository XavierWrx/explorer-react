import type { JSX } from 'react';
import { Header } from './components/organisms/Header';
import { CountryGrid } from './components/organisms/CountryGrid';
import { Footer } from './components/organisms/Footer';
import { useCountries } from './hooks/useCountries';
import { useSearch } from './hooks/useSearch';

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
  const { state, retry } = useCountries();
  const countries = state.status === 'success' ? state.data : [];
  const {
    query,
    setQuery,
    region,
    setRegion,
    visibleCountries,
    clearFilters,
  } = useSearch(countries);

  const handleSelect = (code: string): void => {
    console.log('Código del país seleccionado:', code);
  };

  return (
    <main className="min-h-screen bg-surface-color-background text-texto-secondary flex flex-col justify-between">
      <div className="mx-auto max-w-7xl w-full px-4 py-8 flex-1">
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
            <div className="mb-6 font-roboto font-bold text-texto-secondary">
              <p>Mostrando {visibleCountries.length} países</p>
            </div>
            {visibleCountries.length === 0 ? (
              <EmptyState onClearFilters={clearFilters} />
            ) : (
              <CountryGrid
                countries={visibleCountries}
                onSelect={handleSelect}
              />
            )}
          </>
        )}
        
      </div>
      <Footer />
    </main>
  );
}
export default App;