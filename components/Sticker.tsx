'use client'

import { PartLabel } from '@/components/PartLabel'
import { Button } from '@/components/ui/button'
import type { Part, Sticker as Type } from '@/lib/types'
import { X } from 'lucide-react'
import { Resizable, type ResizeCallback } from 're-resizable'

interface StickerProps {
  sticker: Type
  onEdit: (sticker: Type) => void
  onRemove: (sticker: Type) => void
}

export function Sticker({ sticker, onRemove, onEdit }: StickerProps) {
  const handleRemove = (removed: Part) => {
    onEdit({
      ...sticker,
      parts: sticker.parts.filter(({ id }) => id !== removed.id),
    })
  }

  const handleEdit = (updated: Part) => {
    onEdit({
      ...sticker,
      parts: sticker.parts.map((part) =>
        part.id === updated.id ? updated : part
      ),
    })
  }

  const handleResized: ResizeCallback = (event, direction, ref, delta) => {
    onEdit({
      ...sticker,
      size: {
        ...sticker.size,
        width: sticker.size.width + Math.round(pxToMm(delta.width)),
        height: sticker.size.height + Math.round(pxToMm(delta.height)),
      },
    })
  }

  return (
    <Resizable
      className="relative flex flex-row flex-wrap items-start border border-gray-400 content-start gap-1.5 p-0.5 overflow-hidden group/sticker"
      enable={{ right: true, bottom: true, bottomRight: true }}
      size={{
        width: mmToPx(sticker.size.width),
        height: mmToPx(sticker.size.height),
      }}
      onResizeStop={handleResized}
    >
      {sticker.parts.map((part) => (
        <PartLabel
          key={part.id}
          part={part}
          onRemove={handleRemove}
          onEdit={handleEdit}
        />
      ))}
      {onRemove && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover/sticker:opacity-100 focus:opacity-100 transition-opacity print:hidden"
          onClick={() => onRemove(sticker)}
        >
          <X />
          <span className="sr-only">Remove part</span>
        </Button>
      )}
    </Resizable>
  )
}

function pxToMm(px: number) {
  return px / 3.7795275591
}

function mmToPx(mm: number) {
  return mm * 3.7795275591
}
