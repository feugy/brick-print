'use client'

import { PartSelector } from '@/components/PartSelector'
import { PrintButton } from '@/components/PrintButton'
import { Sticker } from '@/components/Sticker'
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
import type { Part, Size, Sticker as StickerType } from '@/lib/types'
import { PlusCircle } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

const predefinedSizes: Size[] = [
  { width: 160, height: 40, unit: 'mm' },
  { width: 330, height: 60, unit: 'mm' },
  { width: 40, height: 40, unit: 'mm' },
]

export default function CreatePage() {
  const [stickers, setStickers] = useState<StickerType[]>([])
  const [selectedSize, setSelectedSize] = useState<string>('0')
  const [customSize, setCustomSize] = useState<Size>({
    width: 100,
    height: 100,
    unit: 'mm',
  })
  const printableRef = useRef<HTMLDivElement>(null)

  const handleAddSticker = useCallback(() => {
    const size =
      selectedSize === 'custom'
        ? customSize
        : predefinedSizes[Number(selectedSize)]
    const sticker: StickerType = {
      id: Date.now().toString(),
      size,
      parts: [],
    }
    setStickers((stickers) => [sticker, ...stickers])
    if (selectedSize === 'custom') {
      setSelectedSize('0')
    }
  }, [customSize, selectedSize])

  const handleRemoveSticker = (removed: StickerType) => {
    setStickers((prevStickers) =>
      prevStickers.filter(({ id }) => id !== removed.id)
    )
  }

  const handleAddPart = (part: Part) => {
    if (!stickers.length) return
    addPart(stickers[0], part)
  }

  const addPart = ({ id }: StickerType, added: Part) => {
    setStickers((stickers) =>
      stickers.map((sticker) =>
        sticker.id === id
          ? {
              ...sticker,
              parts: [...sticker.parts, added],
            }
          : sticker
      )
    )
  }

  const handleRemovePart = ({ id }: StickerType, removed: Part) => {
    setStickers((stickers) =>
      stickers.map((sticker) =>
        sticker.id === id
          ? {
              ...sticker,
              parts: sticker.parts.filter(({ id }) => id !== removed.id),
            }
          : sticker
      )
    )
  }

  const handleEditPart = ({ id }: StickerType, updated: Part) => {
    setStickers((stickers) =>
      stickers.map((sticker) =>
        sticker.id === id
          ? {
              ...sticker,
              parts: sticker.parts.map((part) =>
                part.id === updated.id ? updated : part
              ),
            }
          : sticker
      )
    )
  }

  const handleSizeChange = (value: string) => {
    setSelectedSize(value)
  }

  const handleCustomSizeChange = (
    dimension: 'width' | 'height',
    value: string
  ) => {
    setCustomSize((prev) => ({ ...prev, [dimension]: Number(value) }))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Stickers</h1>

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
                onChange={(e) =>
                  handleCustomSizeChange('width', e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="custom-height">Height (mm)</Label>
              <Input
                id="custom-height"
                type="number"
                value={customSize.height}
                onChange={(e) =>
                  handleCustomSizeChange('height', e.target.value)
                }
              />
            </div>
          </div>
        )}

        <Button onClick={handleAddSticker}>
          <PlusCircle className="mr-2" /> Add New Sticker
        </Button>
      </div>

      <PartSelector
        onAdd={handleAddPart}
        selected={stickers.flatMap((s) => s.parts)}
      />

      <div className="flex flex-row flex-wrap gap-2" ref={printableRef}>
        {stickers.map((sticker) => (
          <Sticker
            key={sticker.id}
            size={sticker.size}
            parts={sticker.parts}
            onRemovePart={(part) => handleRemovePart(sticker, part)}
            onEditPart={(part) => handleEditPart(sticker, part)}
            onRemove={() => handleRemoveSticker(sticker)}
          />
        ))}
      </div>

      {stickers.length > 0 && (
        <div className="mt-4">
          <PrintButton ref={printableRef} />
        </div>
      )}
    </div>
  )
}
