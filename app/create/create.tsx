'use client'

import { StickerPage } from '@/components/sticker-page'
import { StoreProvider } from '@/hooks/use-store'
import { SessionProvider } from 'next-auth/react'

export function Create() {
  return (
    <SessionProvider>
      <StoreProvider>
        <StickerPage withInstructions />
      </StoreProvider>
    </SessionProvider>
  )
}
