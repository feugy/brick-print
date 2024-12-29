import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { InputHTMLAttributes, KeyboardEvent, RefObject } from 'react'

interface SearchFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  isLoading: boolean
  onSearch: () => void
  ref?: RefObject<HTMLInputElement>
}

export function SearchField({
  onSearch,
  isLoading,
  ref,
  ...props
}: SearchFieldProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div className="flex gap-2">
      <Input {...props} onKeyDown={handleKeyDown} ref={ref} type="text" />
      <Button disabled={isLoading} onClick={onSearch}>
        {isLoading ? 'Searching...' : 'Search'}
      </Button>
    </div>
  )
}
