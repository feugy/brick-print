import { AlignmentSelector } from '@/components/alignment-selector'
import { Button } from '@/components/ui/button'
import type { Alignment, Size } from '@/lib/types'
import { Copy, X } from 'lucide-react'

interface StickerControlProps {
  onCopy: () => void
  onRemove: () => void
  alignment: Alignment
  onAlignmentChange: (newAlignment: Alignment) => void
  size: Size
}

export function StickerControl({
  onCopy,
  onRemove,
  alignment,
  onAlignmentChange,
  size,
}: StickerControlProps) {
  return (
    <div
      className="absolute z-10 top-[-1px] left-[100%]
   bg-white border border-l-0 border-gray-400 rounded-r
     p-1 pl-0 flex flex-col items-center gap-1 
     opacity-0 transition-opacity print:hidden
     group-hover/sticker:opacity-100 group-hover/sticker:flex group-focus-within/sticker:opacity-100"
    >
      <AlignmentSelector
        alignment={alignment}
        onAlignmentChange={onAlignmentChange}
      />
      <Button size="icon" className="h-6 w-6 self-end" onClick={onCopy}>
        <Copy />
        <span className="sr-only">Copy sticker</span>
      </Button>
      <div className="text-xs text-center">
        {size.width}x{size.height}
      </div>
      <Button
        variant="destructive"
        size="icon"
        className="h-6 w-6 self-end"
        onClick={onRemove}
      >
        <X />
        <span className="sr-only">Remove sticker</span>
      </Button>
    </div>
  )
}
