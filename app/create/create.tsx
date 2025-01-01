'use client'

import { StickerPage } from '@/components/sticker-page'
import { StoreProvider } from '@/hooks/use-store'

interface CreateProps {
  withSaveButton: boolean
}

export function Create({ withSaveButton }: CreateProps) {
  return (
    <StoreProvider>
      <StickerPage withInstructions withSaveButton={withSaveButton} />
    </StoreProvider>
  )
}
