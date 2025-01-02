import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface TitleBlockProps {
  value?: string
  onChange?: (value: string) => void
}

export function TitleBlock({ value, onChange }: TitleBlockProps) {
  return (
    <span className="flex gap-4 items-center">
      <Label className="whitespace-nowrap" htmlFor="title">
        Stickers name:
      </Label>
      <Input
        type="text"
        name="title"
        value={value}
        readOnly={!onChange}
        onChange={onChange ? (e) => onChange(e.currentTarget.value) : undefined}
      />
    </span>
  )
}
