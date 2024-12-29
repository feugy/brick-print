import { useState } from 'react'
import type { Part } from '@/lib/types'
import { PartImage } from '@/components/PartImage'
import { Button } from '@/components/ui/button'
import { X, Edit2 } from 'lucide-react'
import { EditPartModal } from './EditPartModal'

interface PartLabelProps {
  part: Part
  onRemove?: (part: Part) => void
  onEdit?: (updatedPart: Part) => void
}

export function PartLabel({ part, onRemove, onEdit }: PartLabelProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <div className="flex items-center gap-1 h-8 p-0.5 relative group">
      <PartImage part={part} className="w-7 h-7" />
      <div className="flex flex-col text-[8px] leading-[.6rem]">
        <span className="font-medium whitespace-pre-wrap">{part.name}</span>
        <span className="text-gray-500 truncate">{part.id}</span>
      </div>
      <div className="absolute right-0 top-0 h-full flex gap-1 items-center opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
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
