import { Breadcrumb } from '@/components/breadcrumb'
import { PageTitle } from '@/components/page-title'
import { load } from '@/lib/storage'
import { Suspense } from 'react'
import { Details } from './details'
import Loading from './loading'

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = load(id)
  return (
    <>
      <PageTitle>Edit Stickers</PageTitle>
      <div className="flex flex-col gap-4 p-4">
        <Breadcrumb pageName="Edit" />
        <Suspense fallback={<Loading />}>
          <Details data={data} />
        </Suspense>
      </div>
    </>
  )
}
