import type { JSX } from "react";
import { Link } from "react-router-dom";
import type { Country } from "../../types/country";

import poblacionIcon from "../../assets/Poblacion.svg";
import regionIcon from "../../assets/Region.svg";
import capitalIcon from "../../assets/Capital.svg";
import placeholderIcon from "../../assets/Mosaico.svg";
import { FavoriteButton } from '../atoms/FavoriteButton';

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps): JSX.Element {
  const name = country.names?.common || "Desconocido";
  const code = country.codes?.alpha_2 || "N/A";
  const flagUrl = country.flag?.url_svg || placeholderIcon;
  const flagDesc = country.flag?.description || `Bandera de ${name}`;

  const safePopulation = country.population || 0;
  const populationText = safePopulation > 1000000 
    ? (safePopulation / 1000000).toFixed(1) + " millones"
    : safePopulation.toLocaleString();

  const region = country.region || "No definida";
  const capital = country.capitals?.[0]?.name || "N/A";

  return (
    <article className="bg-surface-background rounded-rd-sm border-2 border-brand-accent p-6 shadow-sm flex flex-col justify-between w-full h-full hover:shadow-md transition-shadow">
      <div className="flex justify-end -mb-8">
        <FavoriteButton code={code} variant="icon" />
      </div>
      
      <h2 className="font-roboto font-black text-center text-lg md:text-xl text-surface-icon-color uppercase mb-4 tracking-wide">
        {name}
      </h2>

      <div className="w-full h-40 min-h-[160px] rounded-rd-sm overflow-hidden flex items-center justify-center bg-surface-color-background border border-brand-primary p-2 mb-6">
        <img 
          src={flagUrl} 
          alt={flagDesc} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderIcon;
          }}
        />
      </div>

      <ul className="space-y-4 font-roboto text-sm text-texto-secondary mb-6 flex-1">
        <li className="flex items-center justify-between border-b border-brand-primary pb-2 gap-2">
          <span className="flex items-center gap-2 font-bold text-surface-icon-color">
            <img src={poblacionIcon} alt="" className="w-5 h-5 object-contain" />
            Población:
          </span>
          <span className="font-semibold text-right">{populationText}</span>
        </li>
        <li className="flex items-center justify-between border-b border-brand-primary pb-2 gap-2">
          <span className="flex items-center gap-2 font-bold text-surface-icon-color">
            <img src={regionIcon} alt="" className="w-5 h-5 object-contain" />
            Región:
          </span>
          <span className="font-semibold text-right truncate" title={region}>{region}</span>
        </li>
        <li className="flex items-center justify-between border-b border-brand-primary pb-2 gap-2">
          <span className="flex items-center gap-2 font-bold text-surface-icon-color">
            <img src={capitalIcon} alt="" className="w-5 h-5 object-contain" />
            Capítal:
          </span>
          <span className="font-semibold text-right truncate" title={capital}>{capital}</span>
        </li>
      </ul>

      <Link
        to={`/country/${encodeURIComponent(code)}`}
        className="w-full bg-brand-button-default hover:bg-brand-button-hover active:scale-95 text-surface-icon-color font-roboto font-bold h-11 px-4 rounded-rd-sm text-xs transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary cursor-pointer uppercase mt-auto flex items-center justify-center"
      >
        Más información
      </Link>
    </article>
  );
}