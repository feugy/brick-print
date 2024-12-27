import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Part {
  id: string;
  name: string;
}

interface SearchResultProps {
  searchResults: Part[];
  size?: number;
  onSelectPart: (part: Part) => void;
}

export function SearchResult({ searchResults, onSelectPart, size = 150 }: SearchResultProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const resultRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchResults]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gridRef.current) return;

      const columns = Math.floor(gridRef.current.clientWidth / size);
      const rows = Math.ceil(searchResults.length / columns);

      const currentRow = Math.floor(selectedIndex / columns);
      const currentCol = selectedIndex % columns;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (currentRow < rows - 1) {
            const newIndex = selectedIndex + columns;
            if (newIndex < searchResults.length) {
              setSelectedIndex(newIndex);
            }
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (currentRow > 0) {
            setSelectedIndex(selectedIndex - columns);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (currentCol < columns - 1 && selectedIndex < searchResults.length - 1) {
            setSelectedIndex(selectedIndex + 1);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (currentCol > 0) {
            setSelectedIndex(selectedIndex - 1);
          }
          break;
        case 'Enter':
          e.preventDefault();
          if (searchResults[selectedIndex]) {
            onSelectPart(searchResults[selectedIndex]);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchResults, selectedIndex, onSelectPart, size]);

  useEffect(() => {
    if (resultRefs.current[selectedIndex]) {
      resultRefs.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex]);

  if (searchResults.length === 0) {
    return null;
  }

  return (
    <ScrollArea className="h-[450px] w-full rounded-md">
      <div 
        ref={gridRef}
        className={`grid gap-2 p-4 grid-cols-[repeat(auto-fill,minmax(${size}px,1fr))]`}
      >
        {searchResults.map((part, index) => (
          <div
            key={part.id}
            className={`flex flex-col items-center justify-center p-2 border rounded cursor-pointer hover:bg-gray-100 transition-colors ${
              index === selectedIndex ? 'bg-gray-200 border-blue-500' : ''
            }`}
            onClick={() => onSelectPart(part)}
            ref={(el) => (resultRefs.current[index] = el)}
          >
            <div className="relative aspect-square w-5/6">
              <Image
                alt={part.name}
                layout="fill"
                objectFit="contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
                src={`https://brickarchitect.com/content/parts-veryhighcontrast/${part.id}.png`}
              />
            </div>
            <p className="text-xs font-medium text-center mt-2 truncate w-full">{part.name}</p>
            <p className="text-xs text-gray-500">{part.id}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

