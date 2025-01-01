import { improveQuery } from '@/lib/query'
import { fixName } from '@/lib/text'
import type { Part } from '@/lib/types'
import * as cheerio from 'cheerio'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(
      `https://brickarchitect.com/parts/search?q=${encodeURIComponent(improveQuery(query))}`
    )

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      )
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    const parts: Part[] = []

    // Find all divs with class 'partcontainer'
    $('.partcontainer').each((_, element) => {
      const partIdElement = $(element).find('.partnum')
      const partNameElement = $(element).find('.partname')

      // Remove .indicator elements from partIdElement
      partIdElement.find('.indicator').remove()

      const id = partIdElement.text().trim()
      const name = partNameElement.text().trim()

      if (id && name) {
        parts.push({ id, name: fixName(name) })
      }
    })

    return NextResponse.json({ parts })
  } catch (error) {
    console.error('Error fetching part data:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch part data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
