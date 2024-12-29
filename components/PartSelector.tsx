'use client'

import { type MouseEvent, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SearchResults } from '@/components/SearchResults'
import SearchField from '@/components/SearchField'
import type { Part } from '@/lib/types'

interface PartSelectorProps {
  onAdd: (part: Part) => void
  selected: Part[]
}

export function PartSelector({
  onAdd: onAddBrick,
  selected: selectedBricks,
}: PartSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Part[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const searchParts = async () => {
    if (!searchTerm) return

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/search-parts?q=${encodeURIComponent(searchTerm)}`
      )
      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setSearchResults(data.parts)
      setOpen(true)
    } catch (error) {
      console.error('Error fetching part data:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddBrick = (part: Part) => {
    onAddBrick(part)
    setOpen(false)
  }

  const handleClickSearch = (e: MouseEvent<HTMLInputElement>) => {
    // prevents opening search results when they are empty
    if (!searchResults.length) {
      e.preventDefault()
    }
  }

  return (
    <div className="mb-4 relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <SearchField
            isLoading={isLoading}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={handleClickSearch}
            onSearch={searchParts}
            placeholder="Search for Lego parts"
            value={searchTerm}
          />
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
          <SearchResults
            onSelect={handleAddBrick}
            results={searchResults}
            selected={selectedBricks}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
