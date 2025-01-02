import { auth } from '@/lib/auth'
import { list, load, save } from '@/lib/storage'
import type { Page } from '@/lib/types'
import type { Session } from 'next-auth'
import postgres, { type JSONValue } from 'postgres'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const sql = postgres(process.env.DATABASE_URL ?? '', { ssl: 'allow' })

vi.mock('@/lib/auth')

const authMock = vi.mocked(auth as () => Promise<Session | null>)

describe('given existing pages', () => {
  const page: Page = {
    id: '66f91b26-fc57-4dcd-ad53-c0f503d097fa',
    title: 'Test page',
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

  const page2: Page = {
    id: '00e32354-7a6c-456f-bd3b-44a812da586f',
    title: 'Test page #2',
    stickers: [
      {
        id: '1',
        alignment: 'top-left',
        size: { width: 160, height: 40 },
        parts: [{ id: '11090', name: 'Bar Holder w/ Clip' }],
      },
    ],
  }

  const owner = 'jane@doo.dev'
  const owner2 = 'jack@spar.row'

  beforeEach(async () => {
    vi.resetAllMocks()
    authMock.mockResolvedValue({ user: { email: owner }, expires: '1' })
    await sql`TRUNCATE TABLE pages;`
    await sql`INSERT INTO pages (id, title, stickers, owner) VALUES 
  (${page.id}, ${page.title ?? ''}, ${sql.json(page.stickers as unknown as readonly JSONValue[])}, ${owner}),
  (${page2.id}, ${page2.title ?? ''}, ${sql.json(page2.stickers as unknown as readonly JSONValue[])}, ${owner2})`
  })

  describe('save()', () => {
    it.each([
      {
        test: 'missing data',
        error:
          '"undefined" is not valid JSON at "stickers"; Required at "stickers"',
      },
      {
        test: 'empty stickers',
        stickers: [],
        error: 'Array must contain at least 1 element(s) at "stickers"',
      },
      {
        test: 'invalid sticker size',
        stickers: [
          { id: '1', alignment: 'top-left', size: { width: -1 }, parts: [] },
        ],
        error:
          'Number must be greater than 0 at "stickers[0].size.width"; Required at "stickers[0].size.height"',
      },
      {
        test: 'invalid parts',
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
      {
        test: 'title too long',
        title: 'a'.repeat(256),
        stickers: [
          {
            id: '1',
            alignment: 'top-left',
            size: { width: 160, height: 40 },
            parts: [{ id: 'valid', name: '1x1 plate' }],
          },
        ],
        error: 'String must contain at most 100 character(s) at "title"',
      },
    ])('rejects $test', async ({ error, stickers, title }) => {
      const data = new FormData()
      if (stickers) {
        data.append('stickers', JSON.stringify(stickers))
      }
      if (title) {
        data.append('title', title)
      }
      expect(await save({ success: true, message: '' }, data)).toEqual({
        success: false,
        message: `Validation error: ${error}`,
      })
    })

    it('redirects when saving new page', async () => {
      const data = new FormData()
      let id: string
      const stickers = [
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
      ]
      data.append('stickers', JSON.stringify(stickers))
      try {
        await save({ success: true, message: '' }, data)
        throw new Error('should have thrown a redirection')
      } catch (err) {
        const { digest } = err as { digest: string }
        expect(digest).toMatch(
          /^NEXT_REDIRECT;replace;\/\w{8}-\w{4}-\w{4}-\w{4}-\w{12};307;$/
        )
        id = digest.split(';')[2].slice(1)
      }
      expect(
        await sql`SELECT title, stickers FROM pages WHERE id = ${id}`
      ).toEqual([{ title: 'Stickers (2)', stickers }])
    })

    it('saves existing page data', async () => {
      const title = 'A new title'
      const stickers = [
        ...page.stickers,
        {
          id: '3',
          alignment: 'top-left',
          size: { width: 40, height: 40 },
          parts: [{ id: '62213', name: 'Grille for 2x3 Window' }],
        },
      ]
      const data = new FormData()
      data.append('id', page.id)
      data.append('title', title)
      data.append('stickers', JSON.stringify(stickers))
      expect(await save({ success: true, message: '' }, data)).toEqual({
        success: true,
        message: 'Page saved',
      })
      expect(
        await sql`SELECT title, stickers FROM pages WHERE id = ${page.id}`
      ).toEqual([{ title, stickers }])
    })

    it('denies unauthenticated users', async () => {
      authMock.mockResolvedValue(null)
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
        ])
      )

      expect(await save({ success: true, message: '' }, data)).toEqual({
        success: false,
        message: 'Not authenticated',
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
      const id = 'fa3849a2-6154-46e7-98b4-78bc34963a0c'
      expect(await load(id)).toEqual({
        success: false,
        message: `No page with id '${id}'`,
      })
    })

    it('returns existing data', async () => {
      expect(await load(page.id)).toEqual({ success: true, page })
    })

    it('can not access other user pages', async () => {
      expect(await load(page2.id)).toEqual({
        success: false,
        message: `No page with id '${page2.id}'`,
      })
      authMock.mockResolvedValue({ user: { email: owner2 }, expires: '1' })
      expect(await load(page2.id)).toEqual({
        success: true,
        page: page2,
      })
    })

    it('denies unauthenticated users', async () => {
      authMock.mockResolvedValue(null)
      expect(await load(page.id)).toEqual({
        success: false,
        message: 'Not authenticated',
      })
    })
  })

  describe('list()', () => {
    it('returns available pages', async () => {
      expect(await list()).toEqual({
        success: true,
        pages: [page],
      })
    })

    it('handles no data', async () => {
      await sql`TRUNCATE TABLE pages;`
      expect(await list()).toEqual({ success: true, pages: [] })
    })

    it('denies unauthenticated users', async () => {
      authMock.mockResolvedValue(null)
      expect(await list()).toEqual({
        success: false,
        message: 'Not authenticated',
      })
    })
  })
})
