"use client"

import { useState, useRef, useEffect } from "react"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SearchResult } from "./SearchResult"
import SearchField from "./SearchField"
import { Part } from "@/lib/types"

interface BrickSelectorProps {
  onAddBrick: (part: Part) => void;
  selectedBricks: Part[];
}

export default function BrickSelector({ onAddBrick, selectedBricks }: BrickSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Part[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const searchParts = async () => {
    if (!searchTerm) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search-parts?q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setResults(data.parts);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching part data:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const setResults = (parts: Part[]) => {
    setSearchResults(parts.filter(part => selectedBricks.every(({ id }) => id !== part.id)));
  }

  const handleAddBrick = (part: Part) => {
    onAddBrick(part);
    setOpen(false);
  }
  
  const handleClickSearch = (e) => {
    // prevents opening search results when they are empty
    if (!searchResults.length) {
      e.preventDefault()
    }
  }

  // Excluded new selected bricks from search results
  useEffect(() => {
    setResults(searchResults)
  }, [selectedBricks]);

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
        <PopoverContent 
          className="p-0 w-[var(--radix-popover-trigger-width)]"
        >
          <SearchResult onSelectPart={handleAddBrick} searchResults={searchResults} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

