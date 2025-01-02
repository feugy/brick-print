import * as flags from '@/lib/flags'
import { type ApiData, verifyAccess } from '@vercel/flags'
import { getProviderData } from '@vercel/flags/next'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get('Authorization'))
  if (!access) return NextResponse.json(null, { status: 401 })
  return NextResponse.json<ApiData>(getProviderData(flags))
}
