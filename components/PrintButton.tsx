import { Button } from '@/components/ui/button'
import type { RefObject } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Printer } from 'lucide-react'

interface PrintButtonProps {
  className?: string
  ref: RefObject<HTMLDivElement | null>
}

export function PrintButton({ className, ref }: PrintButtonProps) {
  const print = useReactToPrint({
    contentRef: ref,
    bodyClass: 'm-3',
  })

  return (
    <Button
      onClick={() => print()}
      className={`text-xl ${className}`}
      size="lg"
    >
      <Printer className="!h-[1em] !w-[1em]" /> Print
    </Button>
  )
}
