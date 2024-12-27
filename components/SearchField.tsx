import React, { forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: () => void;
  isLoading: boolean;
}

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ onSearch, isLoading, ...props }, ref) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch();
      }
    };
  
    return (
      <div className="flex gap-2">
        <Input
          {...props}
          onKeyPress={handleKeyPress}
          ref={ref}
          type="text"
        />
        <Button disabled={isLoading} onClick={onSearch}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
    )
  }
)

SearchField.displayName = "SearchField"

export default SearchField

