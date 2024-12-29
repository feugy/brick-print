import { PartLabel } from '@/components/PartLabel'
import { Button } from '@/components/ui/button'
import type { Part, Size } from '@/lib/types'
import { X } from 'lucide-react'

interface StickerProps {
  size: Size
  parts: Part[]
  onRemovePart?: (part: Part) => void
  onEditPart?: (part: Part) => void
  onRemove?: () => void
}

export function Sticker({
  size,
  parts,
  onRemove,
  onRemovePart,
  onEditPart,
}: StickerProps) {
  const containerStyle = {
    width: `${size.width}mm`,
    height: `${size.height}mm`,
    border: '1px solid black',
  }

  return (
    <div
      style={containerStyle}
      className="relative flex flex-row flex-wrap items-start content-start gap-1.5 p-0.5 overflow-hidden group/sticker"
    >
      {parts.map((part) => (
        <PartLabel
          key={part.id}
          part={part}
          onRemove={onRemovePart}
          onEdit={onEditPart}
        />
      ))}
      {onRemove && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover/sticker:opacity-100 focus:opacity-100 transition-opacity"
          onClick={() => onRemove()}
        >
          <X />
          <span className="sr-only">Remove part</span>
        </Button>
      )}
    </div>
  )
}
