'use client'

import { Instructions } from '@/components/instructions'
import { PartSelector } from '@/components/part-selector'
import { PrintButton } from '@/components/print-button'
import { SaveButton } from '@/components/save-button'
import { SizeSelector } from '@/components/size-selector'
import { Sticker } from '@/components/sticker'
import { useStore } from '@/hooks/use-store'
import { save } from '@/lib/storage'
import { useActionState, useEffect, useMemo, useRef } from 'react'
import { toast } from 'sonner'

interface StickerPageProps {
  withSaveButton: boolean
  withInstructions?: boolean
}

export function StickerPage({
  withInstructions,
  withSaveButton,
}: StickerPageProps) {
  const [instructionsOpen, setInstructionsOpen] = useStore((state) => [
    state.instructionsOpen,
    state.setInstructionsOpen,
  ])

  const stickers = useStore((state) => state.stickers)
  const id = useStore((state) => state.id)
  const selectedParts = useMemo(
    () => stickers.flatMap((s) => s.parts),
    [stickers]
  )
  const handleAddPart = useStore((state) => state.addPart)
  const handleAddSticker = useStore((state) => state.addSticker)
  const updateSticker = useStore((state) => state.updateSticker)
  const removeSticker = useStore((state) => state.removeSticker)
  const printableRef = useRef<HTMLDivElement>(null)
  const [formState, formAction] = useActionState(save, {
    success: true,
    message: '',
  })

  useEffect(() => {
    const { message, success } = formState
    if (message) {
      if (success) {
        toast.success(message)
      } else {
        toast.error(message)
      }
    }
  }, [formState])

  return (
    <div className="flex flex-col gap-4 p-4">
      {withInstructions && (
        <Instructions open={instructionsOpen} onToggle={setInstructionsOpen} />
      )}
      <SizeSelector onAdd={handleAddSticker} />
      {stickers.length > 0 && (
        <PartSelector
          onAdd={handleAddPart}
          selected={selectedParts}
          onSearch={() => setInstructionsOpen(false)}
        />
      )}
      <form action={withSaveButton ? formAction : undefined}>
        <div className="flex flex-row flex-wrap gap-2" ref={printableRef}>
          {stickers.map((sticker) => (
            <Sticker
              key={sticker.id}
              sticker={sticker}
              onEdit={updateSticker}
              onRemove={removeSticker}
            />
          ))}
        </div>
        {id ? <input type="hidden" name="id" value={id} /> : null}
        <input type="hidden" name="stickers" value={JSON.stringify(stickers)} />
        {stickers.length > 0 && (
          <div className="flex flex-row gap-2 justify-center mt-2">
            <PrintButton ref={printableRef} />
            {withSaveButton && <SaveButton />}
          </div>
        )}
      </form>
    </div>
  )
}
