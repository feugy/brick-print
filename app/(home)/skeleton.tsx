import { Skeleton } from '@/components/ui/skeleton'

export function ListSkeleton() {
  return (
    <>
      <h2 className="text-muted-foreground">Sticker pages</h2>
      <Skeleton className="h-[58px] w-full" />
      <Skeleton className="h-[58px] w-full" />
      <Skeleton className="h-[58px] w-full" />
    </>
  )
}
