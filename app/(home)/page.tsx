import { Breadcrumb } from '@/components/breadcrumb'
import { PageTitle } from '@/components/page-title'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { list } from '@/lib/storage'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { List } from './list'
import { ListSkeleton } from './skeleton'

export default async function Home() {
  const session = await auth()
  const data = session?.user
    ? list()
    : Promise.resolve({ success: true, pages: [] })
  return (
    <>
      <PageTitle>Brick Print</PageTitle>
      <div className="flex flex-col gap-4 p-4">
        <Breadcrumb />
        <p className="text-muted-foreground">
          Create printable stickers for your Lego storage boxes.
        </p>
        <Link href="/create">
          <Button>
            <PlusCircle className="mr-2" /> Create New stickers
          </Button>
        </Link>
        <Suspense fallback={<ListSkeleton />}>
          <List data={data} />
        </Suspense>
      </div>
    </>
  )
}
