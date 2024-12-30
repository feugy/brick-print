import { PartImage } from '@/components/PartImage'
import { Button } from '@/components/ui/button'
import type { Part } from '@/lib/types'
import { Edit2, X } from 'lucide-react'
import { useState } from 'react'
import { EditPartModal } from './EditPartModal'

interface PartLabelProps {
  part: Part
  onRemove?: (part: Part) => void
  onEdit?: (updatedPart: Part) => void
}

export function PartLabel({ part, onRemove, onEdit }: PartLabelProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  return (
    <div className="flex items-center gap-1 h-8 p-0.5 relative group/part">
      <PartImage part={part} className="handle cursor-move w-7 h-7" />
      <div className="flex flex-col font-[Arial,Helvetica] text-[8px] leading-[.6rem] ">
        <span className="font-medium whitespace-pre-wrap">{part.name}</span>
        <span className="text-gray-500 truncate">{part.id}</span>
      </div>

      <div className="z-10 absolute right-0 top-0 flex flex-col gap-1 items-center opacity-0 group-hover/part:opacity-100 group-focus-within/part:opacity-100 transition-opacity print:hidden">
        {onEdit && (
          <Button
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit2 />
            <span className="sr-only">Edit part name</span>
          </Button>
        )}
        {onRemove && (
          <Button
            size="icon"
            className="h-6 w-6"
            onClick={() => onRemove(part)}
          >
            <X />
            <span className="sr-only">Remove part</span>
          </Button>
        )}
      </div>
      {onEdit && (
        <EditPartModal
          part={part}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={onEdit}
        />
      )}
    </div>
  )
}
