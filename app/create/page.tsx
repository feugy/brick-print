import { PageTitle } from '@/components/page-title'
import { Create } from './create'
import { canSave } from '@/lib/flags'

export default async function CreatePage() {
  const withSaveButton = await canSave()
  return (
    <div className="flex flex-col gap-4">
      <PageTitle>Create New Stickers</PageTitle>
      <Create withSaveButton={withSaveButton} />
    </div>
  )
}
