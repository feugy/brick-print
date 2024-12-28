import type { Part } from '@/lib/types'

interface PartLabelProps {
  part: Part
}

export function PartLabel({ part }: PartLabelProps) {
  return (
    <div className="flex items-center h-8 p-0.5">
      <img
        src={`https://brickarchitect.com/content/parts-veryhighcontrast/${part.id}.png`}
        alt={part.name}
        className="max-h-full w-auto"
      />
      <div className="flex text-[7px] flex-col w-14 overflow-hidden ml-2">
        <span className="font-medium line-clamp-2">{part.name}</span>
        <span className="text-gray-500 truncate">{part.id}</span>
      </div>
    </div>
  )
}
