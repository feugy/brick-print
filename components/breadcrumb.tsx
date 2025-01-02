import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumb as UIBreadcrumb,
} from '@/components/ui/breadcrumb'

interface BreadcrumbProps {
  pageName?: string
}

export function Breadcrumb({ pageName }: BreadcrumbProps) {
  return (
    <UIBreadcrumb className="border-b p-2">
      <BreadcrumbList>
        {pageName ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{pageName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </UIBreadcrumb>
  )
}
