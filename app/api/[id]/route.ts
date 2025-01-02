import { load } from '@/lib/storage'
import { NextResponse } from 'next/server'

export const GET = async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const data = await load(id)
  if (data.success) {
    return NextResponse.json(data)
  }
  const status =
    data.message === 'Not authenticated'
      ? 401
      : data.message.startsWith('No page')
        ? 404
        : 500
  return NextResponse.json({ error: data.message }, { status })
}
