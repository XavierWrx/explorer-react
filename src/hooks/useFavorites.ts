import { useCallback, useEffect, useState } from 'react';

const FAVORITES_STORAGE_KEY = 'explorer-app:favorites';
const FAVORITES_UPDATED_EVENT = 'explorer:favorites-updated';

export interface UseFavoritesReturn {
  favorites: string[];
  isFavorite: (code: string) => boolean;
  toggleFavorite: (code: string) => void;
  favoritesCount: number;
}

function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

function readFavorites(): string[] {
  try {
    const storedValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);
    if (!Array.isArray(parsedValue)) {
      return [];
    }

    const normalizedFavorites = parsedValue
      .filter((value: unknown): value is string => typeof value === 'string')
      .map(normalizeCode)
      .filter((value: string): boolean => value.length > 0);

    return [...new Set(normalizedFavorites)];
  } catch {
    return [];
  }
}

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<string[]>(readFavorites);

  useEffect(() => {
    const synchronizeFavorites = (): void => {
      setFavorites(readFavorites());
    };

    window.addEventListener(FAVORITES_UPDATED_EVENT, synchronizeFavorites);
    window.addEventListener('storage', synchronizeFavorites);

    return () => {
      window.removeEventListener(FAVORITES_UPDATED_EVENT, synchronizeFavorites);
      window.removeEventListener('storage', synchronizeFavorites);
    };
  }, []);

  const toggleFavorite = useCallback((code: string): void => {
    const normalizedCode = normalizeCode(code);
    if (!normalizedCode) {
      return;
    }

    setFavorites((currentFavorites: string[]): string[] => {
      const nextFavorites = currentFavorites.includes(normalizedCode)
        ? currentFavorites.filter((favoriteCode: string): boolean =>
            favoriteCode !== normalizedCode
          )
        : [...currentFavorites, normalizedCode];

      try {
        window.localStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(nextFavorites),
        );
      } catch {
        // Keep the in-memory state usable if storage is unavailable.
      }

      window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));
      return nextFavorites;
    });
  }, []);

  const isFavorite = useCallback(
    (code: string): boolean => {
      const normalizedCode = normalizeCode(code);
      return normalizedCode.length > 0 && favorites.includes(normalizedCode);
    },
    [favorites],
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    favoritesCount: favorites.length,
  };
}
