import type { ReactNode } from 'react'

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-5xl font-bold bg-accent text-black uppercase px-8 py-4 w-screen">
      {children}
    </h1>
  )
}
