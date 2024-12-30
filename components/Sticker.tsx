'use client'

import { useState } from 'react'
import { PartLabel } from '@/components/PartLabel'
import { StickerControl } from '@/components/StickerControl'
import type { Alignment, Part, Sticker as Type } from '@/lib/types'
import { Resizable, type ResizeCallback } from 're-resizable'

interface StickerProps {
  sticker: Type
  onEdit: (sticker: Type) => void
  onRemove: (sticker: Type) => void
}

export function Sticker({ sticker, onRemove, onEdit }: StickerProps) {
  const [currentSize, setCurrentSize] = useState(sticker.size)

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
    const newSize = {
      width: sticker.size.width + Math.round(pxToMm(delta.width)),
      height: sticker.size.height + Math.round(pxToMm(delta.height)),
    }
    setCurrentSize(newSize)
    onEdit({
      ...sticker,
      size: newSize,
    })
  }

  const handleResize: ResizeCallback = (event, direction, ref, delta) => {
    setCurrentSize({
      width: sticker.size.width + Math.round(pxToMm(delta.width)),
      height: sticker.size.height + Math.round(pxToMm(delta.height)),
    })
  }

  const handleChangeAlignment = (newAlignment: Alignment) => {
    onEdit({
      ...sticker,
      alignment: newAlignment,
    })
  }

  return (
    <Resizable
      className={`relative flex flex-row flex-wrap  ${getAlignmentClass(sticker.alignment)} border border-gray-400 gap-1.5 p-[2px] overflow-hidden hover:border-2 hover:p-[1px] group/sticker`}
      enable={{ right: true, bottom: true, bottomRight: true }}
      size={{
        width: mmToPx(sticker.size.width),
        height: mmToPx(sticker.size.height),
      }}
      onResize={handleResize}
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
      <StickerControl
        onRemove={() => onRemove(sticker)}
        alignment={sticker.alignment}
        onAlignmentChange={handleChangeAlignment}
        size={currentSize}
      />
    </Resizable>
  )
}

function pxToMm(px: number) {
  return px / 3.7795275591
}

function mmToPx(mm: number) {
  return mm * 3.7795275591
}

function getAlignmentClass(alignment: Alignment): string {
  switch (alignment) {
    case 'top-left':
      return 'justify-start content-start'
    case 'top-center':
      return 'justify-center content-start'
    case 'top-right':
      return 'justify-end content-start'
    case 'middle-left':
      return 'justify-start content-center'
    case 'middle-center':
      return 'justify-center content-center'
    case 'middle-right':
      return 'justify-end content-center'
    case 'bottom-left':
      return 'justify-start content-end'
    case 'bottom-center':
      return 'justify-center content-end'
    case 'bottom-right':
      return 'justify-end content-end'
  }
}
