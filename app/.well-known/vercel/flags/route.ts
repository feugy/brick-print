import * as flags from '@/lib/flags'
import { verifyAccess, type ApiData } from '@vercel/flags'
import { getProviderData } from '@vercel/flags/next'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get('Authorization'))
  if (!access) return NextResponse.json(null, { status: 401 })
  return NextResponse.json<ApiData>(getProviderData(flags))
}
