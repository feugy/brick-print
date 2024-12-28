import { forwardRef, type InputHTMLAttributes, type KeyboardEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch: () => void
  isLoading: boolean
}

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ onSearch, isLoading, ...props }, ref) => {
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
)

SearchField.displayName = 'SearchField'

export default SearchField
