import { PartImage } from '@/components/PartImage'
import { Button } from '@/components/ui/button'
import type { Part } from '@/lib/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Edit2, X } from 'lucide-react'
import { useState } from 'react'
import { EditPartModal } from './EditPartModal'

interface PartLabelProps {
  part: Part
  onRemove?: (part: Part) => void
  onEdit?: (updatedPart: Part) => void
  dragOverlay?: boolean
}

export function PartLabel({
  part,
  onRemove,
  onEdit,
  dragOverlay,
}: PartLabelProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { active, listeners, setNodeRef, transform, transition } = useSortable({
    id: part.id,
    transition: null,
  })

  const style = {
    transform: CSS.Transform.toString(
      transform
        ? {
            ...transform,
            scaleX: 1,
            scaleY: 1,
          }
        : null
    ),
    transition,
    visibility:
      !dragOverlay && active?.id === part.id ? ('hidden' as const) : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-1 h-8 p-0.5 relative group/part"
    >
      <PartImage part={part} className="w-7 h-7" {...listeners} />
      <div className="flex flex-col font-[Arial,Helvetica] text-[8px] leading-[.6rem] ">
        <span className="font-medium whitespace-pre-wrap">{part.name}</span>
        <span className="text-gray-500 truncate">{part.id}</span>
      </div>
      <div className="z-10 absolute right-0 top-0 h-full flex gap-1 items-center opacity-0 group-hover/part:opacity-100 group-focus-within/part:opacity-100 transition-opacity print:hidden">
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
