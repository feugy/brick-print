'use client'

import { StickerPage } from '@/components/sticker-page'
import { StoreProvider } from '@/hooks/use-store'
import type { LoadResponse } from '@/lib/types'
import { SessionProvider } from 'next-auth/react'
import { use } from 'react'

interface DetailsProps {
  data: Promise<LoadResponse>
}

export function Details(props: DetailsProps) {
  const data = use(props.data)
  if (!data.success) {
    return <div>{data.message}</div>
  }
  return (
    <SessionProvider>
      <StoreProvider state={data.page}>
        <StickerPage withText />
      </StoreProvider>
    </SessionProvider>
  )
}
