'use client'

import { Page } from '@/components/Page'
import { PartSelector } from '@/components/PartSelector'
import { SizeSelector } from '@/components/SizeSelector'
import type { Part, Sticker } from '@/lib/types'
import { useMemo, useState } from 'react'

export default function CreatePage() {
  const [stickers, setStickers] = useState<Sticker[]>([])
  const selectedParts = useMemo(
    () => stickers.flatMap((s) => s.parts),
    [stickers]
  )

  const handleAddSticker = (sticker: Sticker) => {
    setStickers((stickers) => [sticker, ...stickers])
  }

  const handleAddPart = (part: Part) => {
    if (!stickers.length) return
    addPart(stickers[0], part)
  }

  const addPart = ({ id }: Sticker, added: Part) => {
    setStickers((stickers) =>
      stickers.map((sticker) =>
        sticker.id === id
          ? {
              ...sticker,
              parts: [...sticker.parts, added],
            }
          : sticker
      )
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl font-bold bg-accent text-black uppercase px-8 py-4 w-screen">
        Create New Stickers
      </h1>
      <div className="flex flex-col gap-4 p-4">
        <SizeSelector onAdd={handleAddSticker} />
        <PartSelector onAdd={handleAddPart} selected={selectedParts} />
        <Page stickers={stickers} onEdit={setStickers} />
      </div>
    </div>
  )
}
