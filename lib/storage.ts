'use server'

import { randomUUID } from 'node:crypto'
import { auth } from '@/lib/auth'
import type {
  ListResponse,
  LoadResponse,
  Page,
  SaveResponse,
} from '@/lib/types'
import { redirect } from 'next/navigation'
import postgres from 'postgres'
import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'

const sql = postgres(process.env.DATABASE_URL ?? '', { ssl: 'allow' })

const pageSchema = z.object({
  id: z.string().optional(),
  title: z.string().max(100).optional(),
  stickers: z.preprocess(
    (input, ctx: z.RefinementCtx) => {
      try {
        return JSON.parse(input as string)
      } catch (error) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: (error as Error).message,
        })
      }
    },
    z
      .array(
        z.object({
          id: z.string(),
          alignment: z.string(), // TODO enum
          size: z.object({
            width: z.number().positive(),
            height: z.number().positive(),
          }),
          parts: z
            .array(
              z.object({
                id: z.string().max(30),
                name: z.string().max(50),
              })
            )
            .max(50),
        })
      )
      .min(1)
      .max(10)
  ),
})

// CREATE TABLE pages(id UUID PRIMARY KEY, title TEXT, stickers JSONB, owner TEXT);

export async function save(_: SaveResponse, body: FormData) {
  const response: SaveResponse = { success: false, message: '' }

  const parsed = pageSchema.safeParse(Object.fromEntries(body.entries()))
  if (!parsed.success) {
    response.message = fromZodError(parsed.error).message
    return response
  }

  const { id, title, stickers } = parsed.data
  const session = await auth()
  if (!session?.user?.email) {
    response.message = 'Not authenticated'
  } else {
    const savedId = id ?? randomUUID()
    try {
      console.log(
        `saving page ${savedId} (title: '${title}') for owner ${session.user.email}`
      )

      await sql`
        INSERT INTO pages (id, title, stickers, owner)
        VALUES (${savedId}, ${title ?? makeTitle(stickers)}, ${sql.json(stickers)}, ${session.user.email})
        ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, stickers = EXCLUDED.stickers
        RETURNING id
      `

      response.success = true
      response.message = 'Page saved'
    } catch (error) {
      console.error(error)
      response.message = `Failed to save page: ${(error as Error).message}`
    }
    if (!id) {
      return redirect(`/${savedId}`)
    }
  }
  return response
}

function makeTitle(stickers: unknown[]) {
  return `Stickers (${stickers.length})`
}

const idSchema = z.object({ id: z.string().uuid() })

export async function load(id: string) {
  const response: LoadResponse = { success: false, message: '' }

  const parsed = idSchema.safeParse({ id })
  if (!parsed.success) {
    response.message = fromZodError(parsed.error).message
    return response
  }

  const session = await auth()
  if (!session?.user?.email) {
    response.message = 'Not authenticated'
  } else {
    try {
      console.log(`loading page ${id} for owner ${session.user.email}`)
      const rows = await sql<
        Page[]
      >`SELECT id, title, stickers FROM pages WHERE id = ${id} AND owner = ${session.user.email}`
      if (rows.length === 1) {
        return { success: true, page: rows[0] } as LoadResponse
      }
      response.message = `No page with id '${id}'`
    } catch (error) {
      console.error(error)
      response.message = `Failed to load page: ${(error as Error).message}`
    }
  }
  return response
}

export async function list() {
  const response: ListResponse = { success: false, message: '' }

  const session = await auth()
  if (!session?.user?.email) {
    response.message = 'Not authenticated'
  } else {
    try {
      console.log(`list pages for owner ${session.user.email}`)
      const pages = await sql<
        Page[]
      >`SELECT id, title, stickers FROM pages WHERE owner = ${session.user.email}`
      return { success: true, pages } as ListResponse
    } catch (error) {
      console.error(error)
      response.message = `Failed to list pages: ${(error as Error).message}`
    }
  }
  return response
}
