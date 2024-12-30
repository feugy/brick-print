'use client'

import { Instructions } from '@/components/Instructions'
import { Page } from '@/components/Page'
import { PartSelector } from '@/components/PartSelector'
import { SizeSelector } from '@/components/SizeSelector'
import { StoreProvider, useStore } from '@/hooks/use-store'
import { useMemo } from 'react'

export default function CreatePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl font-bold bg-accent text-black uppercase px-8 py-4 w-screen">
        Create New Stickers
      </h1>
      <StoreProvider>
        <InnerPage />
      </StoreProvider>
    </div>
  )
}

function InnerPage() {
  const stickers = useStore((state) => state.stickers)
  const [instructionsOpen, setInstructionsOpen] = useStore((state) => [
    state.instructionsOpen,
    state.setInstructionsOpen,
  ])

  const selectedParts = useMemo(
    () => stickers.flatMap((s) => s.parts),
    [stickers]
  )

  const handleAddPart = useStore((state) => state.addPart)
  const handleAddSticker = useStore((state) => state.addSticker)
  return (
    <div className="flex flex-col gap-4 p-4">
      <Instructions open={instructionsOpen} onToggle={setInstructionsOpen} />
      <SizeSelector onAdd={handleAddSticker} />
      {stickers.length > 0 && (
        <PartSelector
          onAdd={handleAddPart}
          selected={selectedParts}
          onSearch={() => setInstructionsOpen(false)}
        />
      )}
      <Page />
    </div>
  )
}
