import { load } from '@/lib/storage'
import { Suspense } from 'react'
import { Details } from './details'
import Loading from './loading'
import { PageTitle } from '@/components/page-title'

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = load(id)
  return (
    <div className="flex flex-col gap-4">
      <PageTitle>Edit Stickers</PageTitle>
      <Suspense fallback={<Loading />}>
        <Details data={data} />
      </Suspense>
    </div>
  )
}
