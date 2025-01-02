import type { ReactNode } from 'react'
import AccountMenu from './account-menu'

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-5xl font-bold bg-accent text-black uppercase px-8 py-4 w-screen flex items-center">
      <span className="flex-1">{children}</span>
      <AccountMenu />
    </h1>
  )
}
