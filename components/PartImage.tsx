import type { Part } from '@/lib/types'

interface PartImageProps {
  part: Part
  className?: string
}

export function PartImage({ part, className = '' }: PartImageProps) {
  return (
    <div className={`flex items-center flex-1 ${className}`}>
      <img
        alt={part.name}
        className="h-auto w-auto"
        style={{ zoom: 0.5 }}
        src={`https://brickarchitect.com/content/parts-veryhighcontrast/${part.id}.png`}
      />
    </div>
  )
}
