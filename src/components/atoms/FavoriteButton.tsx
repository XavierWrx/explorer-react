import type { JSX, MouseEvent } from 'react';
import { useFavorites } from '../../hooks/useFavorites';

export interface FavoriteButtonProps {
  code: string;
  variant?: 'icon' | 'button';
}

export function FavoriteButton({
  code,
  variant = 'icon',
}: FavoriteButtonProps): JSX.Element {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(code);
  const countryCode = code.trim().toUpperCase();

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(code);
  };

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={active}
        aria-label={
          active
            ? `Quitar ${countryCode} de banderas favoritas`
            : `Guardar ${countryCode} en banderas favoritas`
        }
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-rd-full px-5 py-2 font-roboto text-sm font-bold text-surface-icon-color bg-brand-button-default hover:bg-brand-button-hover border border-brand-button-border-gold shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill={active ? '#fbbf24' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M12 2.75l2.78 5.63 6.22.91-4.5 4.38 1.06 6.19L12 17.02l-5.56 2.84 1.06-6.19-4.5-4.38 6.22-.91L12 2.75z" />
        </svg>
        {active ? 'En favoritas' : 'Guardar en favoritas'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={
        active
          ? `Quitar ${countryCode} de banderas favoritas`
          : `Guardar ${countryCode} en banderas favoritas`
      }
      className="inline-flex h-11 w-11 items-center justify-center rounded-rd-full bg-white/95 text-surface-icon-color shadow-sm border border-brand-primary transition-colors hover:bg-brand-button-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill={active ? '#fbbf24' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 2.75l2.78 5.63 6.22.91-4.5 4.38 1.06 6.19L12 17.02l-5.56 2.84 1.06-6.19-4.5-4.38 6.22-.91L12 2.75z" />
      </svg>
    </button>
  );
}
