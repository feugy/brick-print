'use client'

import { PartImage } from '@/components/part-image'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import type { Part } from '@/lib/types'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface PartSelectorProps {
  onAdd: (part: Part) => void
  onSearch?: (text: string) => void
  selected: Part[]
  size?: number
}

export function PartSelector({
  onAdd,
  onSearch,
  selected,
  size = 128,
}: PartSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Part[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const searchParts = useDebouncedCallback(async () => {
    if (searchTerm.length === 0) {
      setSearchResults([])
      return
    }
    if (isLoading || searchTerm.length < 2) return

    setIsLoading(true)
    onSearch?.(searchTerm)
    try {
      const response = await fetch(
        `/api/search-parts?q=${encodeURIComponent(searchTerm)}`
      )
      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setSearchResults(data.parts)
    } catch (error) {
      console.error('Error fetching part data:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }, 500)

  const handleChange = (value: string) => {
    setSearchTerm(value)
    searchParts()
  }

  return (
    <Command shouldFilter={false} loop className="border">
      <CommandInput
        placeholder="Search for Lego parts"
        value={searchTerm}
        onValueChange={handleChange}
      />
      <CommandList>
        {isLoading && <CommandEmpty>Fetching parts...</CommandEmpty>}
        {!isLoading && searchResults.length === 0 && (
          <CommandEmpty>No part found</CommandEmpty>
        )}
        <div
          className="grid gap-2 p-2"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr))`,
          }}
        >
          {searchResults.map((part) => {
            const disabled = selected.some(({ id }) => id === part.id)
            return (
              <CommandItem
                disabled={disabled}
                key={part.id}
                value={part.name}
                className={`flex flex-col items-center justify-start p-2 border rounded cursor-pointer transition-colors ${disabled ? 'bg-muted' : ''}`}
                onSelect={() => onAdd(part)}
              >
                <PartImage part={part} className="max-h-10" />
                <p className="text-xs font-medium text-center mt-2 w-full whitespace-pre-wrap">
                  {part.name}
                </p>
                <p className="text-xs text-gray-500">{part.id}</p>
              </CommandItem>
            )
          })}
        </div>
      </CommandList>
    </Command>
  )
}
