import { PartLabel } from '@/components/PartLabel'
import type { Part, Size } from '@/lib/types'

interface StickerLayoutProps {
  size: Size
  parts: Part[]
  onRemove?: (part: Part) => void
  onEdit?: (part: Part) => void
}

export function StickerLayout({
  size,
  parts,
  onRemove,
  onEdit,
}: StickerLayoutProps) {
  const containerStyle = {
    width: `${size.width}mm`,
    height: `${size.height}mm`,
    border: '1px solid black',
  }

  return (
    <div
      style={containerStyle}
      className="relative flex flex-row flex-wrap items-start content-start gap-1.5 p-0.5 overflow-hidden"
    >
      {parts.map((part) => (
        <PartLabel
          key={part.id}
          part={part}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
