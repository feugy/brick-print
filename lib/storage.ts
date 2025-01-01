'use server'

import type { SaveResponse, LoadResponse, Page } from '@/lib/types'
import { randomUUID } from 'node:crypto'
import { redirect } from 'next/navigation'
import postgres from 'postgres'
import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'

const sql = postgres(process.env.DATABASE_URL ?? '', { ssl: 'allow' })

const pageSchema = z.object({
  id: z.string().optional(),
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

// CREATE TABLE pages(id UUID PRIMARY KEY, stickers JSONB);

export async function save(_: SaveResponse, body: FormData) {
  const response: SaveResponse = { success: false, message: '' }

  const parsed = pageSchema.safeParse(Object.fromEntries(body.entries()))
  if (!parsed.success) {
    response.message = fromZodError(parsed.error).message
    return response
  }

  const { id, stickers } = parsed.data
  let saved: Page | undefined
  try {
    saved = (
      await sql`
      INSERT INTO pages (id, stickers)
      VALUES (${id ?? randomUUID()}, ${sql.json(stickers)})
      ON CONFLICT (id) DO UPDATE SET stickers = EXCLUDED.stickers
      RETURNING id
    `
    )[0] as Page

    response.success = true
    response.message = 'Page saved'
  } catch (error) {
    console.error(error)
    response.message = `Failed to save page: ${(error as Error).message}`
  }
  if (!id && saved?.id) {
    return redirect(`/${saved.id}`)
  }
  return response
}

const idSchema = z.object({ id: z.string().uuid() })

export async function load(id: string) {
  const response: LoadResponse = { success: false, message: '' }

  const parsed = idSchema.safeParse({ id })
  if (!parsed.success) {
    response.message = fromZodError(parsed.error).message
    return response
  }

  try {
    const rows = await sql`SELECT id, stickers FROM pages WHERE id = ${id}`
    if (rows.length === 1) {
      return { success: true, page: rows[0] } as LoadResponse
    }
    response.message = `No page with id '${id}'`
  } catch (error) {
    console.error(error)
    response.message = `Failed to load page: ${(error as Error).message}`
  }
  return response
}
