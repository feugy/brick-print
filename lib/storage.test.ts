import { load, save } from '@/lib/storage'
import type { Page } from '@/lib/types'
import postgres, { type JSONValue } from 'postgres'
import { beforeEach, describe, expect, it } from 'vitest'

const sql = postgres(process.env.DATABASE_URL ?? '', { ssl: 'allow' })

beforeEach(async () => {
  await sql`TRUNCATE TABLE pages;`
})

describe('save()', () => {
  it.each([
    {
      title: 'missing data',
      error:
        '"undefined" is not valid JSON at "stickers"; Required at "stickers"',
    },
    {
      title: 'empty stickers',
      stickers: [],
      error: 'Array must contain at least 1 element(s) at "stickers"',
    },
    {
      title: 'invalid sticker size',
      stickers: [
        { id: '1', alignment: 'top-left', size: { width: -1 }, parts: [] },
      ],
      error:
        'Number must be greater than 0 at "stickers[0].size.width"; Required at "stickers[0].size.height"',
    },
    {
      title: 'invalid parts',
      stickers: [
        {
          id: '1',
          alignment: 'top-left',
          size: { width: 160, height: 40 },
          parts: [{ id: 'valid', name: '1x1 plate' }, { id: 10 }],
        },
      ],
      error:
        'Expected string, received number at "stickers[0].parts[1].id"; Required at "stickers[0].parts[1].name"',
    },
  ])('rejects $title', async ({ error, stickers }) => {
    const data = new FormData()
    if (stickers) {
      data.append('stickers', JSON.stringify(stickers))
    }
    expect(await save({ success: true, message: '' }, data)).toEqual({
      success: false,
      message: `Validation error: ${error}`,
    })
  })

  it('redirects when sacing new page', async () => {
    const data = new FormData()
    data.append(
      'stickers',
      JSON.stringify([
        {
          id: '1',
          alignment: 'top-left',
          size: { width: 160, height: 40 },
          parts: [{ id: '11090', name: 'Bar Holder w/ Clip' }],
        },
        {
          id: '2',
          alignment: 'middle-center',
          size: { width: 40, height: 40 },
          parts: [{ id: '48729', name: 'Bar w/ Clip' }],
        },
      ])
    )
    try {
      await save({ success: true, message: '' }, data)
      throw new Error('should have thrown a redirection')
    } catch (err) {
      expect((err as { digest: string }).digest).toMatch(
        /^NEXT_REDIRECT;replace;\/\w{8}-\w{4}-\w{4}-\w{4}-\w{12};307;$/
      )
    }
  })

  it('saves existing page data', async () => {
    const data = new FormData()
    data.append('id', '66f91b26-fc57-4dcd-ad53-c0f503d097fa')
    data.append(
      'stickers',
      JSON.stringify([
        {
          id: '1',
          alignment: 'top-left',
          size: { width: 160, height: 40 },
          parts: [{ id: '11090', name: 'Bar Holder w/ Clip' }],
        },
        {
          id: '2',
          alignment: 'middle-center',
          size: { width: 40, height: 40 },
          parts: [{ id: '48729', name: 'Bar w/ Clip' }],
        },
      ])
    )
    expect(await save({ success: true, message: '' }, data)).toEqual({
      success: true,
      message: 'Page saved',
    })
  })
})

describe('load()', () => {
  it.each([
    { title: 'missing id', id: undefined, error: 'Required at "id"' },
    { title: 'invalid uuid', id: '18', error: 'Invalid uuid at "id"' },
  ])('rejects $title', async ({ id, error }) => {
    expect(await load(id as unknown as string)).toEqual({
      success: false,
      message: `Validation error: ${error}`,
    })
  })

  it('fails on missing page', async () => {
    const id = '66f91b26-fc57-4dcd-ad53-c0f503d097fa'
    expect(await load(id)).toEqual({
      success: false,
      message: `No page with id '${id}'`,
    })
  })

  describe('given a saved page', () => {
    const page: Page = {
      id: '66f91b26-fc57-4dcd-ad53-c0f503d097fa',
      stickers: [
        {
          id: '1',
          alignment: 'top-left',
          size: { width: 160, height: 40 },
          parts: [{ id: '11090', name: 'Bar Holder w/ Clip' }],
        },
        {
          id: '2',
          alignment: 'middle-center',
          size: { width: 40, height: 40 },
          parts: [{ id: '48729', name: 'Bar w/ Clip' }],
        },
      ],
    }

    beforeEach(async () => {
      await sql`INSERT INTO pages (id, stickers) VALUES (${page.id}, ${sql.json(page.stickers as unknown as readonly JSONValue[])})`
    })

    it('returns existing data', async () => {
      expect(await load(page.id)).toEqual({ success: true, page })
    })
  })
})
