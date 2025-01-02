'use client'

import { PartLabel } from '@/components/part-label'
import { StickerControl } from '@/components/sticker-control'
import type { Alignment, Part, Size, Sticker as Type } from '@/lib/types'
import { Scaling } from 'lucide-react'
import { type NumberSize, Resizable, type ResizeCallback } from 're-resizable'
import { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'

interface StickerProps {
  sticker: Type
  onEdit: (sticker: Type, added?: Part) => void
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

  const handleResized: ResizeCallback = (_event, _direction, _ref, delta) => {
    const size = computeSize(sticker.size, delta)
    setCurrentSize(size)
    onEdit({ ...sticker, size })
  }

  const handleResize: ResizeCallback = (_event, _direction, _ref, delta) => {
    setCurrentSize(computeSize(sticker.size, delta))
  }

  const handleSort = (parts: Part[]) => {
    onEdit({
      ...sticker,
      parts: parts.map(({ id, name }) => ({ id, name })),
    })
  }

  const handleChangeAlignment = (alignment: Alignment) => {
    onEdit({ ...sticker, alignment })
  }

  return (
    <Resizable
      className="relative overflow-visible border border-gray-400 group/sticker"
      enable={{ right: true, bottom: true, bottomRight: true }}
      size={{
        width: mmToPx(sticker.size.width),
        height: mmToPx(sticker.size.height),
      }}
      handleComponent={{
        bottomRight: <CustomHandle />,
      }}
      onResize={handleResize}
      onResizeStop={handleResized}
    >
      <ReactSortable
        group="shared"
        handle=".handle"
        className={`flex h-full flex-wrap gap-1.5 p-0.5 ${getAlignmentClass(sticker.alignment)}`}
        list={sticker.parts}
        setList={handleSort}
      >
        {sticker.parts.map((part) => (
          <PartLabel
            key={part.id}
            part={part}
            onRemove={handleRemove}
            onEdit={handleEdit}
          />
        ))}
      </ReactSortable>
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

function computeSize(size: Size, delta: NumberSize) {
  return {
    width: size.width + Math.round(pxToMm(delta.width)),
    height: size.height + Math.round(pxToMm(delta.height)),
  }
}

function CustomHandle() {
  return (
    <div className="bg-card print:hidden -mt-1 -ml-1">
      <Scaling className="rotate-90" />
    </div>
  )
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
