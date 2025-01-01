import { AlignmentSelector } from '@/components/alignment-selector'
import { Button } from '@/components/ui/button'
import type { Alignment, Size } from '@/lib/types'
import { X } from 'lucide-react'

interface StickerControlProps {
  onRemove: () => void
  alignment: Alignment
  onAlignmentChange: (newAlignment: Alignment) => void
  size: Size
}

export function StickerControl({
  onRemove,
  alignment,
  onAlignmentChange,
  size,
}: StickerControlProps) {
  return (
    <div className="absolute top-2 right-2 flex flex-col items-end gap-1 opacity-0 group-hover/sticker:opacity-100 group-hover/sticker:flex group-focus-within/sticker:opacity-100 transition-opacity print:hidden">
      <Button
        variant="destructive"
        size="icon"
        className="h-6 w-6"
        onClick={onRemove}
      >
        <X />
        <span className="sr-only">Remove sticker</span>
      </Button>
      <AlignmentSelector
        alignment={alignment}
        onAlignmentChange={onAlignmentChange}
      />
      <div className="text-xs text-center">
        {size.width} x {size.height} mm
      </div>
    </div>
  )
}
