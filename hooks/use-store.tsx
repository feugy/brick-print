'use client'

import { buildStore } from '@/lib/build-store'
import type { State, Store } from '@/lib/build-store'
import { type ReactNode, createContext, useContext, useRef } from 'react'
import { type StoreApi, useStore as useZustandStore } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

export const StoreContext = createContext<StoreApi<Store> | null>(null)

export function StoreProvider({
  children,
  state,
}: { children: ReactNode; state?: Partial<State> }) {
  const ref = useRef<StoreApi<Store>>(undefined)
  if (!ref.current) {
    ref.current = buildStore(state)
  }
  return (
    <StoreContext.Provider value={ref.current}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore<T>(selector: (store: Store) => T) {
  const storeContext = useContext(StoreContext)

  if (!storeContext) {
    throw new Error('useStore must be used within StoreProvider')
  }

  return useZustandStore(storeContext, useShallow(selector))
}
