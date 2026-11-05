import type { JSX, ChangeEvent } from "react";

interface SearchBarProps {
  query: string;
  onSearch: (value: string) => void;
}

export function SearchBar({ query, onSearch }: SearchBarProps): JSX.Element {
  return (
    <div className="w-full relative">
      <img src="/src/assets/Buscar.svg" alt="" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2" />
      <label htmlFor="search-input" className="sr-only">Buscar país</label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
        placeholder="Escriba nombre del país..."
        className="w-full h-12 pl-12 pr-4 border-2 border-brand-accent rounded-rd-sm font-roboto text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary text-surface-icon-color bg-surface-background shadow-inner"
      />
    </div>
  );
}