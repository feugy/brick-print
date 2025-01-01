import { verifyAccess, type ApiData } from '@vercel/flags'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get('Authorization'))
  if (!access) return NextResponse.json(null, { status: 401 })

  return NextResponse.json<ApiData>({
    definitions: {
      'can-save': {
        description: 'Whether stickers could be saved in DB',
        options: [{ value: false }, { value: true }],
      },
    },
  })
}
