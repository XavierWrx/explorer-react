
function Footer() {
  return (
    <footer className="bg-slate-900 px-4 py-6 text-slate-200 dark:bg-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm">© 2026 Explorer App</p>
        <nav aria-label="Enlaces del pie de página" className="flex gap-5 text-sm">
          <a className="hover:text-white hover:underline" href="#inicio">
            Inicio
          </a>
          <a className="hover:text-white hover:underline" href="#paises">
            Países
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
