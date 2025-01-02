'use client'

import { StickerPage } from '@/components/sticker-page'
import { StoreProvider } from '@/hooks/use-store'

export function Create() {
  return (
    <StoreProvider>
      <StickerPage withInstructions />
    </StoreProvider>
  )
}
