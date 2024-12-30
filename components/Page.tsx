import { PrintButton } from '@/components/PrintButton'
import { Sticker } from '@/components/Sticker'
import type { Sticker as StickerType } from '@/lib/types'
import { useRef } from 'react'

interface PageProps {
  stickers: StickerType[]
  onEdit: (stickers: StickerType[]) => void
}

export function Page({ stickers, onEdit }: PageProps) {
  const printableRef = useRef<HTMLDivElement>(null)

  const handleRemove = (removed: StickerType) => {
    onEdit(stickers.filter(({ id }) => id !== removed.id))
  }

  const handleEdit = (updated: StickerType) => {
    onEdit(
      stickers.map((sticker) => (sticker.id === updated.id ? updated : sticker))
    )
  }

  return (
    <>
      <div className="flex flex-row flex-wrap gap-2" ref={printableRef}>
        {stickers.map((sticker) => (
          <Sticker
            key={sticker.id}
            sticker={sticker}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        ))}
      </div>
      {stickers.length > 0 && (
        <PrintButton ref={printableRef} className="self-center" />
      )}
    </>
  )
}
