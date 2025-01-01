import { load } from '@/lib/storage'
import { NextResponse } from 'next/server'

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // TODO validate id
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
}
