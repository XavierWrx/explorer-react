import type { JSX } from "react";

export function Footer(): JSX.Element {
  return (
    <footer className="bg-brand-secondary text-texto-invert border-t-4 border-brand-accent px-6 py-6 mt-auto w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <div className="flex flex-col gap-1 items-center md:items-start">
          <a href="/" className="hover:underline focus-visible:ring-2 focus-visible:ring-brand-accent">Explorer App</a>
          <a href="#" className="hover:underline focus-visible:ring-2 focus-visible:ring-brand-accent">Redes Sociales</a>
        </div>
        <img src="/src/assets/Mosaico.svg" alt="Logo Footer" className="w-8 h-8 object-contain" />
        <div className="flex flex-col gap-1 items-center md:items-end">
          <a href="#" className="hover:underline focus-visible:ring-2 focus-visible:ring-brand-accent">Más información</a>
        </div>
      </div>
    </footer>
  );
}