import { Breadcrumb } from '@/components/breadcrumb'
import { PageTitle } from '@/components/page-title'
import { Button } from '@/components/ui/button'
import { canSave } from '@/lib/flags'
import { list } from '@/lib/storage'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { List } from './list'
import Loading from './loading'

export default async function Home() {
  const withSaveButton = await canSave()
  const data = list()
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
        {withSaveButton && (
          <Suspense fallback={<Loading />}>
            <List data={data} />
          </Suspense>
        )}
      </div>
    </>
  )
}
