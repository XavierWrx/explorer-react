import type { JSX, ChangeEvent } from "react";

interface RegionFilterProps {
  region: string;
  onRegionChange: (value: string) => void;
}

export function RegionFilter({ region, onRegionChange }: RegionFilterProps): JSX.Element {
  return (
    <div className="w-full">
      <label htmlFor="region-select" className="sr-only">Filtrar por región</label>
      <select
        id="region-select"
        value={region}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onRegionChange(e.target.value)}
        className="w-full h-11 pl-4 pr-8 border border-brand-accent rounded-rd-sm font-roboto text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary text-surface-icon-color bg-surface-background cursor-pointer"
      >
        <option value="">Todas las regiones</option>
        <option value="Africa">África</option>
        <option value="Americas">América</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europa</option>
        <option value="Oceania">Oceanía</option>
      </select>
    </div>
  );
}
