import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Alignment } from '@/lib/types'
import {
  AlignEndHorizontal,
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyStart,
  AlignStartHorizontal,
  AlignVerticalJustifyEnd,
} from 'lucide-react'

interface AlignmentSelectorProps {
  alignment: Alignment
  onAlignmentChange: (alignment: Alignment) => void
}

const alignmentIcons: Record<Alignment, React.ReactNode> = {
  'top-left': <AlignStartHorizontal className="h-4 w-4" />,
  'top-center': <AlignVerticalJustifyEnd className="h-4 w-4 scale-y-[-1]" />,
  'top-right': <AlignStartHorizontal className="h-4 w-4 scale-x-[-1]" />,
  'middle-left': <AlignHorizontalJustifyStart className="h-4 w-4" />,
  'middle-center': <AlignHorizontalJustifyCenter className="h-4 w-4" />,
  'middle-right': (
    <AlignHorizontalJustifyStart className="h-4 w-4 scale-x-[-1]" />
  ),
  'bottom-left': <AlignEndHorizontal className="h-4 w-4" />,
  'bottom-center': <AlignVerticalJustifyEnd className="h-4 w-4" />,
  'bottom-right': <AlignEndHorizontal className="h-4 w-4 scale-x-[-1]" />,
}

export function AlignmentSelector({
  alignment,
  onAlignmentChange,
}: AlignmentSelectorProps) {
  return (
    <Select value={alignment} onValueChange={onAlignmentChange}>
      <SelectTrigger className="h-6 px-1 w-auto gap-1 bg-primary text-primary-foreground">
        <SelectValue>{alignmentIcons[alignment]}</SelectValue>
      </SelectTrigger>
      <SelectContent side="top" className="min-w-0">
        {Object.entries(alignmentIcons).map(([key, icon]) => (
          <SelectItem key={key} value={key}>
            {icon}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
