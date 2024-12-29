import type { RefObject } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button } from '@/components/ui/button'

interface PrintButtonProps {
  ref: RefObject<HTMLDivElement | null>
}

export function PrintButton({ ref }: PrintButtonProps) {
  const print = useReactToPrint({ contentRef: ref, bodyClass: 'p-4' })

  return (
    <Button onClick={() => print()} className="mt-4">
      Print Sticker
    </Button>
  )
}
