import type { Part } from '@/lib/types'
import type { HTMLAttributes, Ref } from 'react'

interface PartImageProps extends HTMLAttributes<HTMLDivElement> {
  part: Part
  className?: string
  ref?: Ref<HTMLDivElement>
}

export function PartImage({
  part,
  ref,
  className = '',
  ...props
}: PartImageProps) {
  return (
    <div
      className={`flex items-center justify-center flex-1 ${className}`}
      ref={ref}
      {...props}
    >
      <img
        alt={part.name}
        className="h-auto w-auto max-h-full"
        style={{ zoom: 0.5 }}
        src={`https://brickarchitect.com/content/parts-veryhighcontrast/${part.id}.png`}
      />
    </div>
  )
}
