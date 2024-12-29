'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import type { Size, Part } from '@/lib/types'
import { StickerLayout } from './StickerLayout'

interface PrintButtonProps {
  size: Size
  parts: Part[]
}

export function PrintButton({ size, parts }: PrintButtonProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    if (contentRef.current) {
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Sticker</title>
              <style>
                body { margin: 0; }
                @media print {
                  body * {
                    visibility: hidden;
                  }
                  #printable-sticker, #printable-sticker * {
                    visibility: visible;
                  }
                  #printable-sticker {
                    position: absolute;
                    left: 0;
                    top: 0;
                  }
                }
              </style>
              <link rel="stylesheet" href="/styles.css">
            </head>
            <body>
              <div id="printable-sticker" style="width: ${size.width}mm; height: ${size.height}mm;">
                ${contentRef.current.innerHTML}
              </div>
              <script>
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 250);
              </script>
            </body>
          </html>
        `)
        printWindow.document.close()
      }
    }
  }

  return (
    <>
      <div ref={contentRef} className="hidden">
        <StickerLayout size={size} parts={parts} />
      </div>
      <Button onClick={handlePrint} className="mt-4">
        Print Sticker
      </Button>
    </>
  )
}
