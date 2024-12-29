import { Button } from '@/components/ui/button'
import type { RefObject } from 'react'
import { useReactToPrint } from 'react-to-print'

interface PrintButtonProps {
  ref: RefObject<HTMLDivElement | null>
}

export function PrintButton({ ref }: PrintButtonProps) {
  const print = useReactToPrint({
    contentRef: ref,
    bodyClass: 'm-3',
  })

  return (
    <Button onClick={() => print()} className="mt-4">
      Print Sticker
    </Button>
  )
}
