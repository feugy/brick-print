'use client'

import type { ListResponse } from '@/lib/types'
import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'

interface ListProps {
  data: Promise<ListResponse>
}

export function List(props: ListProps) {
  const data = use(props.data)
  if (!data.success) {
    return <div>{data.message}</div>
  }
  if (!data.pages.length) return
  return (
    <>
      <h2 className="text-muted-foreground">Stickers</h2>
      <ol className="flex flex-col gap-2">
        {data.pages.map(({ id, title }) => (
          <Link key={id} href={`/${id}`}>
            <li className="border rounded p-4 gap-4 flex flex-4 items-center hover:bg-muted">
              <SquareArrowOutUpRight className="h-4 w-4" />
              {title}
            </li>
          </Link>
        ))}
      </ol>
    </>
  )
}
