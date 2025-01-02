import { Breadcrumb } from '@/components/breadcrumb'
import { PageTitle } from '@/components/page-title'
import { canSave } from '@/lib/flags'
import { Create } from './create'

export default async function CreatePage() {
  const withSaveButton = await canSave()
  return (
    <>
      <PageTitle>Create New Stickers</PageTitle>
      <div className="flex flex-col gap-4 p-4">
        <Breadcrumb pageName="Create" />
        <Create withSaveButton={withSaveButton} />
      </div>
    </>
  )
}
