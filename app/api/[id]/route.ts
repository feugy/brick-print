import { auth } from '@/lib/auth'
import { load } from '@/lib/storage'
import { NextResponse } from 'next/server'

// @ts-expect-error -- next-auth has not the correct type for params
export const GET = auth(async function GET(
  { auth },
  { params }: { params: Promise<{ id: string }> }
) {
  if (!auth) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  const { id } = await params
  try {
    const data = await load(id)
    if (!data) {
      throw new Error('Page not found')
    }
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error loading page:', error)
    return NextResponse.json(
      {
        error: 'Failed to load page',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
})
