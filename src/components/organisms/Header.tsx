import type { JSX, ReactNode } from "react";
import { SearchBar } from "../molecules/SearchBar";
import { RegionFilter } from "../molecules/RegionFilter";

interface HeaderProps {
  title: string;
  children?: ReactNode;
  query: string;
  onSearch: (value: string) => void;
  region: string;
  onRegionChange: (value: string) => void;
}

export function Header({ title, children, query, onSearch, region, onRegionChange }: HeaderProps): JSX.Element {
  return (
    <header className="w-full flex flex-col gap-8 mb-10">
      {/* Barra de Navegación Superior */}
      <div className="bg-brand-secondary text-texto-invert p-lg py-5 shadow-sm w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 px-4">
          <span className="font-roboto font-black text-sm md:text-base tracking-wide uppercase">
            Scan. Guess. Master the world.
          </span>
          <a href="/" className="flex items-center justify-center">
            <img src="/src/assets/Mosaico.svg" alt="Explorer App Logo" className="w-9 h-9 object-contain" />
          </a>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <a href="/" aria-current="page" className="flex items-center gap-2 px-3 py-1.5 rounded-rd-sm border-b-2 border-brand-accent text-brand-accent font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">
              <img src="/src/assets/home.svg" alt="" className="w-5 h-5" />
              <span>Inicio</span>
            </a>
            <a href="#" className="flex items-center gap-2 px-3 py-1.5 rounded-rd-sm hover:text-brand-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent">
              <img src="/src/assets/Mosaico.svg" alt="" className="w-5 h-5" />
              <span>Mosaico</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Panel de Búsqueda y Filtros */}
      <section className="bg-surface-background rounded-rd-lg p-6 md:p-8 shadow-sm border border-brand-primary max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-8 w-full">
          <div>
            <h1 className="font-roboto font-black text-(length:--font-page-title) leading-tight text-surface-icon-color tracking-tight uppercase">
              {title}
            </h1>
            <div className="font-roboto font-bold text-base md:text-lg mt-1 text-texto-secondary">
              {children}
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <SearchBar query={query} onSearch={onSearch} />
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <RegionFilter region={region} onRegionChange={onRegionChange} />
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}