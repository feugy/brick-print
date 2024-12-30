import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Size, Sticker } from '@/lib/types'

const predefinedSizes: Size[] = [
  { width: 160, height: 40 },
  { width: 330, height: 60 },
  { width: 40, height: 40 },
]

interface SizeSelectorProps {
  onAdd: (sticker: Sticker) => void
}

export function SizeSelector({ onAdd }: SizeSelectorProps) {
  const handleSizeChange = (value: string) => {
    const [width, height] = value.split('x').map(Number)
    const size = { width, height }
    onAdd({
      id: Date.now().toString(),
      size,
      alignment: 'top-left',
      parts: [],
    })
  }

  return (
    <Select onValueChange={handleSizeChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a size" />
      </SelectTrigger>
      <SelectContent>
        {predefinedSizes.map((size) => (
          <SelectItem
            key={`${size.width}x${size.height}`}
            value={`${size.width}x${size.height}`}
          >
            {`${size.width} x ${size.height} mm`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
