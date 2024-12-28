import type { Part } from '@/lib/types'
import { PartImage } from '@/components/PartImage'

interface PartLabelProps {
  part: Part
}

export function PartLabel({ part }: PartLabelProps) {
  return (
    <div className="flex items-center h-8 p-0.5">
      <PartImage part={part} className="w-7" />
      <div className="flex text-[7px] flex-col max-w-14 ml-2 line-clamp-2">
        <span className="font-medium line-clamp-2">{part.name}</span>
        <span className="text-gray-500 truncate">{part.id}</span>
      </div>
    </div>
  )
}
