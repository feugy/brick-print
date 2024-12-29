import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Size, Sticker } from '@/lib/types'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'

const predefinedSizes: Size[] = [
  { width: 160, height: 40, unit: 'mm' },
  { width: 330, height: 60, unit: 'mm' },
  { width: 40, height: 40, unit: 'mm' },
]

interface SizeSelectorProps {
  onAdd: (sticker: Sticker) => void
}

export function SizeSelector({ onAdd }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string>('0')
  const [customSize, setCustomSize] = useState<Size>({
    width: 100,
    height: 100,
    unit: 'mm',
  })

  const handleSizeChange = (value: string) => {
    setSelectedSize(value)
  }

  const handleAdd = () => {
    const size =
      selectedSize === 'custom'
        ? customSize
        : predefinedSizes[Number(selectedSize)]
    if (selectedSize === 'custom') {
      setSelectedSize('0')
    }
    onAdd({
      id: Date.now().toString(),
      size,
      parts: [],
    })
  }

  const handleCustomSizeChange = (
    dimension: 'width' | 'height',
    value: string
  ) => {
    setCustomSize((prev) => ({ ...prev, [dimension]: Number(value) }))
  }

  return (
    <div className="mb-4 space-y-4">
      <div>
        <Label htmlFor="size">Sticker Size</Label>
        <Select value={selectedSize} onValueChange={handleSizeChange}>
          <SelectTrigger id="size">
            <SelectValue placeholder="Select a size" />
          </SelectTrigger>
          <SelectContent>
            {predefinedSizes.map((size, index) => (
              <SelectItem
                key={`${size.width}x${size.height}`}
                value={index.toString()}
              >
                {size.width} x {size.height} ({size.unit})
              </SelectItem>
            ))}
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedSize === 'custom' && (
        <div className="flex gap-4">
          <div>
            <Label htmlFor="custom-width">Width (mm)</Label>
            <Input
              id="custom-width"
              type="number"
              value={customSize.width}
              onChange={(e) => handleCustomSizeChange('width', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="custom-height">Height (mm)</Label>
            <Input
              id="custom-height"
              type="number"
              value={customSize.height}
              onChange={(e) => handleCustomSizeChange('height', e.target.value)}
            />
          </div>
        </div>
      )}

      <Button onClick={handleAdd}>
        <PlusCircle className="mr-2" /> Add New Sticker
      </Button>
    </div>
  )
}
