import { useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PartImage } from '@/components/PartImage'

interface Part {
  id: string
  name: string
}

interface SearchResultsProps {
  results: Part[]
  selected: Part[]
  size?: number
  onSelect: (part: Part) => void
}

export function SearchResults({
  results,
  selected,
  onSelect,
  size = 150,
}: SearchResultsProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  if (results.length === 0) {
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
        {results.map((part) => (
          <button
            disabled={selected.some(({ id }) => id === part.id)}
            key={part.id}
            className={`flex flex-col items-center justify-start p-2 border rounded cursor-pointer transition-colors 
                disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-full`}
            onClick={() => onSelect(part)}
            type="button"
          >
            <PartImage part={part} />
            <p className="text-xs font-medium text-center mt-2 w-full whitespace-pre-wrap">
              {part.name}
            </p>
            <p className="text-xs text-gray-500">{part.id}</p>
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}
