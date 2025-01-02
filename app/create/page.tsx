import { Breadcrumb } from '@/components/breadcrumb'
import { PageTitle } from '@/components/page-title'
import { Create } from './create'

export default function CreatePage() {
  return (
    <>
      <PageTitle>Create New Stickers</PageTitle>
      <div className="flex flex-col gap-4 p-4">
        <Breadcrumb pageName="Create" />
        <Create />
      </div>
    </>
  )
}
