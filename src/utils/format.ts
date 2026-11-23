import type { Country } from '../types/country';

const populationFormatter = new Intl.NumberFormat('es-SV');

export function formatPopulation(
    population: number | null | undefined,
): string {
    if (typeof population !== 'number' || isNaN(population)) {
        return 'Sin datos';
    }
    return populationFormatter.format(population);
}

const regionNames: Record<string, string> = {
    Africa: 'África',
    Americas: 'América',
    Asia: 'Asia',
    Europe: 'Europa',
    Oceania: 'Oceanía',
};

export function getRegionName(region: string | null | undefined): string {
    return region?.trim()
        ? regionNames[region] ?? region
        : 'Sin información';
}

export interface CountryDetailFields {
    nativeName: string;
    domains: string;
    currencies: string;
    languages: string;
    subregion: string;
    area: string;
    coordinates: string;
}

export function formatCountryDetail(country: Country): CountryDetailFields {
    const nativeName: string =
        Object.values(country.names.native ?? {})
            .map((name): string => name?.official || name?.common || '')
            .find((name: string): boolean => name.length > 0) ??
        country.names.common;

    const domains: string =
        country.tlds?.filter(Boolean).join(', ') || 'No disponible';

    const currencies: string =
        country.currencies
            ?.map((currency): string => currency?.name ?? '')
            .filter((name: string): boolean => name.length > 0)
            .join(', ') || 'No disponible';

    const languages: string =
        country.languages
            ?.map((language): string => language?.name ?? '')
            .filter((name: string): boolean => name.length > 0)
            .join(', ') || 'No disponible';

    const subregion: string = country.subregion || 'No disponible';

    const area: string =
        typeof country.area?.kilometers === 'number'
            ? `${country.area.kilometers.toLocaleString('es-ES')} km²`
            : 'No disponible';

    const coordinates: string =
        typeof country.coordinates?.lat === 'number' &&
        typeof country.coordinates?.lng === 'number'
            ? `${country.coordinates.lat}, ${country.coordinates.lng}`
            : 'No disponible';

    return {
        nativeName,
        domains,
        currencies,
        languages,
        subregion,
        area,
        coordinates,
    };
}

export function getCapital(country: Country): string {
    return country.capitals?.[0]?.name || 'Sin capital registrada';
}

export function getFlagDescription(country: Country): string {
    return country.flag?.description?.trim()
        ? country.flag.description
        : `Bandera de ${country.names.common}`;
}