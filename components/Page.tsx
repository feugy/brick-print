import { PrintButton } from '@/components/PrintButton'
import { Sticker } from '@/components/Sticker'
import { useStore } from '@/hooks/use-store'
import { useRef } from 'react'

export function Page() {
  const stickers = useStore((state) => state.stickers)
  const updateSticker = useStore((state) => state.updateSticker)
  const removeSticker = useStore((state) => state.removeSticker)
  const printableRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <div className="flex flex-row flex-wrap gap-2" ref={printableRef}>
        {stickers.map((sticker) => (
          <Sticker
            key={sticker.id}
            sticker={sticker}
            onEdit={updateSticker}
            onRemove={removeSticker}
          />
        ))}
      </div>
      {stickers.length > 0 && (
        <PrintButton ref={printableRef} className="self-center" />
      )}
    </>
  )
}
