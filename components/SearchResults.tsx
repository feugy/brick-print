import { useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PartImage } from '@/components/PartImage'

interface Part {
  id: string
  name: string
}

interface SearchResultsProps {
  searchResults: Part[]
  selectedBricks: Part[]
  size?: number
  onSelectPart: (part: Part) => void
}

export function SearchResults({
  searchResults,
  selectedBricks,
  onSelectPart,
  size = 150,
}: SearchResultsProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  if (searchResults.length === 0) {
    return null
  }

  return (
    <ScrollArea className="h-[450px] w-full rounded-md">
      <div
        ref={gridRef}
        className="grid gap-2 p-4"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(${size}px, 1fr))`,
        }}
      >
        {searchResults.map((part) => (
          <button
            disabled={selectedBricks.some(({ id }) => id === part.id)}
            key={part.id}
            className={`flex flex-col items-center justify-center p-2 border rounded cursor-pointer transition-colors 
                disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onClick={() => onSelectPart(part)}
            type="button"
          >
            <PartImage part={part} />
            <p className="text-xs font-medium text-center mt-2 truncate w-full">
              {part.name}
            </p>
            <p className="text-xs text-gray-500">{part.id}</p>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}
