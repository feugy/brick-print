import { Label } from '@/components/ui/label'
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
  onAdd?: (sticker: Sticker) => void
}

export function SizeSelector({ onAdd }: SizeSelectorProps) {
  const handleSizeChange = (value: string) => {
    onAdd?.({
      id: Date.now().toString(),
      size: predefinedSizes[Number.parseInt(value)],
      alignment: 'top-left',
      parts: [],
    })
  }

  return (
    <span className="flex gap-4 items-center">
      <Label htmlFor="size">Add sticker:</Label>
      <Select value="" onValueChange={handleSizeChange} name="size">
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a size" />
        </SelectTrigger>
        <SelectContent>
          {predefinedSizes.map((size, index) => (
            <SelectItem
              key={`${size.width}x${size.height}`}
              value={index.toString()}
            >
              {`${size.width} x ${size.height} mm`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </span>
  )
}
