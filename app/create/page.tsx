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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Stickers</h1>

      <SizeSelector onAdd={handleAddSticker} />
      <PartSelector onAdd={handleAddPart} selected={selectedParts} />
      <Page stickers={stickers} onEdit={setStickers} />
    </div>
  )
}
