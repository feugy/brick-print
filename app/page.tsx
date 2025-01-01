import { PageTitle } from '@/components/page-title'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <PageTitle>Brick Print</PageTitle>
      <p className="mb-8 text-lg">
        Create printable stickers for your Lego storage boxes.
      </p>
      <Link href="/create">
        <Button>
          <PlusCircle className="mr-2" /> Create New Sticker
        </Button>
      </Link>
    </div>
  )
}
