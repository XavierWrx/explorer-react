import type { ReactNode } from 'react'

interface HeaderProps {
  children: ReactNode
}

function Header({ children }: HeaderProps) {
  return (
    <header className="bg-slate-900 text-white dark:bg-slate-900">
      {children}
    </header>
  )
}

export default Header
