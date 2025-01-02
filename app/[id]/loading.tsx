import { TitleBlock } from '@/components/title-block'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronDown, Search } from 'lucide-react'

export default function Loading() {
  return (
    <>
      <TitleBlock value={'...'} />
      <Button className="px-3 w-[200px] text-left" variant="outline" disabled>
        <span className="flex-1">Select a size</span>
        <ChevronDown />
      </Button>
      <div className="border rounded text-sm ">
        <div className="flex flex-col">
          <span className="px-3 h-10 flex items-center border-b text-muted-foreground">
            <Search className="h-4 w-4 mr-2" /> Search for Lego parts
          </span>
          <div className="py-6 mb-4 text-center">No part found</div>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Skeleton className="h-[40mm] w-[40mm]" />
        <Skeleton className="h-[40mm] w-[160mm]" />
        <Skeleton className="h-[40mm] w-[160mm]" />
      </div>
    </>
  )
}
