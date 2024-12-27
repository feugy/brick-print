"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import BrickSelector from "@/components/BrickSelector"
import StickerLayout from "@/components/StickerLayout"
import { PrintButton } from "@/components/PrintButton"
import { Part, Size } from "@/lib/types"

const predefinedSizes: Size[] = [
  { width: 160, height: 40, unit: 'mm' },
  { width: 330, height: 60, unit: 'mm' },
  { width: 35, height: 35, unit: 'mm' }
]

export default function CreateSticker() {
  const [size, setSize] = useState<Size>(predefinedSizes[0])
  const [customSize, setCustomSize] = useState<Size>({ width: 10, height: 10, unit: 'mm' })
  const [selectedBricks, setSelectedBricks] = useState<Part[]>([])

  const handleSizeChange = (value: string) => {
    if (value === "custom") {
      setSize(customSize)
    } else {
      setSize(predefinedSizes[Number.parseInt(value)])
    }
  }

  const handleCustomSizeChange = (dimension: 'width' | 'height', value: string) => {
    const newSize = { ...customSize, [dimension]: Number.parseInt(value) }
    setCustomSize(newSize)
    if (size.width === customSize.width && size.height === customSize.height) {
      setSize(newSize)
    }
  }

  const handleAddBrick = (brick: Part) => {
    setSelectedBricks([...selectedBricks, brick])
  }

  const currentSize = size.width === customSize.width && size.height === customSize.height ? customSize : size

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Sticker</h1>
      
      <div className="mb-4">
        <Label htmlFor="size">Sticker Size</Label>
        <Select onValueChange={handleSizeChange}>
          <SelectTrigger id="size">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {predefinedSizes.map((s, index) => (
              <SelectItem key={index} value={index.toString()}>
                {s.width} x {s.height} ({s.unit})
              </SelectItem>
            ))}
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {currentSize === customSize && (
        <div className="flex gap-4 mb-4">
          <div>
            <Label htmlFor="custom-width">Width</Label>
            <Input
              id="custom-width"
              type="number"
              value={customSize.width}
              onChange={(e) => handleCustomSizeChange("width", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="custom-height">Height</Label>
            <Input
              id="custom-height"
              type="number"
              value={customSize.height}
              onChange={(e) => handleCustomSizeChange("height", e.target.value)}
            />
          </div>
        </div>
      )}

      <BrickSelector onAddBrick={handleAddBrick} selectedBricks={selectedBricks} />

      <StickerLayout
        size={currentSize}
        bricks={selectedBricks}
      />

      <PrintButton size={currentSize} bricks={selectedBricks} />
    </div>
  )
}

