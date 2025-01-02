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
import { TitleBlock } from './title-block'

interface StickerPageProps {
  withText?: boolean
  withInstructions?: boolean
}

export function StickerPage({ withText, withInstructions }: StickerPageProps) {
  const [instructionsOpen, setInstructionsOpen] = useStore((state) => [
    state.instructionsOpen,
    state.setInstructionsOpen,
  ])

  const stickers = useStore((state) => state.stickers)
  const [title, setTitle] = useStore((state) => [state.title, state.setTitle])
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
    <form className="flex flex-col gap-4" action={formAction}>
      {withInstructions && (
        <Instructions open={instructionsOpen} onToggle={setInstructionsOpen} />
      )}
      {withText && <TitleBlock value={title} onChange={setTitle} />}
      <SizeSelector onAdd={handleAddSticker} />
      {stickers.length > 0 && (
        <PartSelector
          onAdd={handleAddPart}
          selected={selectedParts}
          onSearch={() => setInstructionsOpen(false)}
        />
      )}
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
          <SaveButton />
        </div>
      )}
    </form>
  )
}
