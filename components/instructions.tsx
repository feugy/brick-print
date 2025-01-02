import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Info } from 'lucide-react'

interface InstructionsProps {
  open: boolean
  onToggle: (isOpen: boolean) => void
}

export function Instructions({ open, onToggle }: InstructionsProps) {
  return (
    <Accordion
      className="border rounded p-4"
      type="single"
      collapsible
      value={open ? 'instructions' : ''}
      onValueChange={(value) => onToggle(value === 'instructions')}
    >
      <AccordionItem value="instructions" className="border-none">
        <AccordionTrigger className="items-start p-0 hover:no-underline">
          <span className="flex gap-2">
            <Info className="h-4 w-4" />
            How to use
          </span>
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          <ol className="list-decimal list-inside space-y-1">
            <li>First, add a sticker.</li>
            <li>Search for parts to add to it.</li>
            <li>
              You can resize stickers by dragging the bottom-right corner.
            </li>
            <li>Reorder parts within stickers by dragging them.</li>
            <li>Print your stickers when ready!</li>
          </ol>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
