import type { Alignment } from '@/lib/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlignStartHorizontal,
  AlignVerticalJustifyEnd,
  AlignEndHorizontal,
  AlignHorizontalJustifyStart,
  AlignHorizontalJustifyCenter,
} from 'lucide-react'

interface AlignmentSelectorProps {
  alignment: Alignment
  onAlignmentChange: (alignment: Alignment) => void
}

const alignmentIcons: Record<Alignment, React.ReactNode> = {
  'top-left': <AlignStartHorizontal />,
  'top-center': <AlignVerticalJustifyEnd className="scale-y-[-1]" />,
  'top-right': <AlignStartHorizontal className="scale-x-[-1]" />,
  'middle-left': <AlignHorizontalJustifyStart />,
  'middle-center': <AlignHorizontalJustifyCenter />,
  'middle-right': <AlignHorizontalJustifyStart className="scale-x-[-1]" />,
  'bottom-left': <AlignEndHorizontal />,
  'bottom-center': <AlignVerticalJustifyEnd />,
  'bottom-right': <AlignEndHorizontal className="scale-x-[-1]" />,
}

export function AlignmentSelector({
  alignment,
  onAlignmentChange,
}: AlignmentSelectorProps) {
  return (
    <Select value={alignment} onValueChange={onAlignmentChange}>
      <SelectTrigger className="h-8 px-2 bg-primary text-primary-foreground">
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
