import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Brick Print</h1>
      <p className="mb-4">
        Create printable stickers for your Lego storage boxes.
      </p>
      <Link href="/create">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Sticker
        </Button>
      </Link>
    </div>
  )
}
