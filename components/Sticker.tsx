import { PartLabel } from '@/components/PartLabel'
import { Button } from '@/components/ui/button'
import type { Part, Sticker as Type } from '@/lib/types'
import { X } from 'lucide-react'

interface StickerProps {
  sticker: Type
  onEdit: (sticker: Type) => void
  onRemove: (sticker: Type) => void
}

export function Sticker({ sticker, onRemove, onEdit }: StickerProps) {
  const containerStyle = {
    width: `${sticker.size.width}mm`,
    height: `${sticker.size.height}mm`,
    border: '1px solid black',
  }

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

  return (
    <div
      style={containerStyle}
      className="relative flex flex-row flex-wrap items-start content-start gap-1.5 p-0.5 overflow-hidden group/sticker"
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
          className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover/sticker:opacity-100 focus:opacity-100 transition-opacity"
          onClick={() => onRemove(sticker)}
        >
          <X />
          <span className="sr-only">Remove part</span>
        </Button>
      )}
    </div>
  )
}
