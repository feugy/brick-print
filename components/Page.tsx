import { PartLabel } from '@/components/PartLabel'
import { PrintButton } from '@/components/PrintButton'
import { Sticker } from '@/components/Sticker'
import type { Part, Sticker as StickerType } from '@/lib/types'
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useMemo, useRef, useState } from 'react'

interface PageProps {
  stickers: StickerType[]
  onEdit: (stickers: StickerType[]) => void
}

export function Page({ stickers, onEdit }: PageProps) {
  const printableRef = useRef<HTMLDivElement>(null)
  const selectedParts = useMemo(
    () => stickers.flatMap((s) => s.parts),
    [stickers]
  )

  const dndSensors = useSensors(useSensor(PointerSensor))
  const [moved, setMoved] = useState<Part | null>(null)

  const handleRemove = (removed: StickerType) => {
    onEdit(stickers.filter(({ id }) => id !== removed.id))
  }

  const handleEdit = (updated: StickerType) => {
    onEdit(
      stickers.map((sticker) => (sticker.id === updated.id ? updated : sticker))
    )
  }

  const handleMovePart = (event: DragEndEvent) => {
    const { active, over } = event
    const origin = stickers.find(({ parts }) =>
      parts.find(({ id }) => id === active.id)
    )
    const destination = over
      ? stickers.find(({ parts }) => parts.find(({ id }) => id === over.id))
      : undefined

    if (moved && destination && origin) {
      if (origin !== destination) {
        origin.parts.splice(
          origin.parts.findIndex(({ id }) => id === active.id),
          1
        )
        destination.parts.splice(
          destination.parts.findIndex(({ id }) => id === over?.id),
          0,
          moved
        )
      } else {
        const from = origin.parts.findIndex(({ id }) => id === active.id)
        const to = origin.parts.findIndex(({ id }) => id === over?.id)
        origin.parts = arrayMove(origin.parts, from, to)
      }
      setMoved(null)
      onEdit([...stickers])
    }
  }

  const handleStartMove = (event: DragEndEvent) => {
    setMoved(selectedParts.find(({ id }) => id === event.active.id) || null)
  }

  return (
    <DndContext
      sensors={dndSensors}
      onDragStart={handleStartMove}
      onDragEnd={handleMovePart}
    >
      <SortableContext items={selectedParts}>
        <div className="flex flex-row flex-wrap gap-2" ref={printableRef}>
          {stickers.map((sticker) => (
            <Sticker
              key={sticker.id}
              sticker={sticker}
              onEdit={handleEdit}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {moved ? <PartLabel part={moved} dragOverlay /> : null}
      </DragOverlay>
      {stickers.length > 0 && (
        <PrintButton ref={printableRef} className="self-center" />
      )}
    </DndContext>
  )
}
