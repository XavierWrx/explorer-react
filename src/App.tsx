import { useState, type JSX } from 'react';
import type { Country } from './types/country';
import { filterCountries } from './utils/filter';
import { countriesDemo } from './data/countries-demo';
import { Header } from './components/organisms/Header';
import { CountryGrid } from './components/organisms/CountryGrid';
import { Footer } from './components/organisms/Footer';

export function App(): JSX.Element {
  // 1. Declaración de estados locales
  const [query, setQuery] = useState<string>('');
  const [region, setRegion] = useState<string>('');

  // 2. Resultado derivado: recalcula los países en cada render sin usar otro useState
  const filteredCountries: Country[] = filterCountries(
    countriesDemo,
    query,
    region
  );

  const handleSelect = (code: string) => {
    console.log("Código del país seleccionado:", code);
  };

  return (
    <main className="min-h-screen bg-surface-color-background text-texto-secondary flex flex-col justify-between">
      <div className="mx-auto max-w-7xl w-full px-4 py-8 flex-1">
        
        {/* 3. Controles vinculados (Prop Drilling) */}
        <Header
          title="EXPLORAR PAÍSES DEL MUNDO"
          query={query}
          onSearch={setQuery}
          region={region}
          onRegionChange={setRegion}
        >
          <p>Aprende lo más importante</p>
        </Header>
        
        {/* Contador dinámico */}
        <div className="mb-6 font-roboto font-bold text-texto-secondary">
          <p>Mostrando {filteredCountries.length} países</p>
        </div>

        {/* 4. Renderizado condicional */}
        {filteredCountries.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-roboto text-lg mb-4 text-surface-icon-color">
              No se encontraron países que coincidan con tu búsqueda.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setRegion('');
              }}
              className="bg-brand-button-default hover:bg-brand-button-hover active:scale-95 text-surface-icon-color font-roboto font-bold px-6 py-2 rounded-rd-sm transition-all shadow-sm cursor-pointer"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <CountryGrid countries={filteredCountries} onSelect={handleSelect} />
        )}
        
      </div>
      <Footer />
    </main>
  );
}
//Final
export default App;