import type { Part, Size, Sticker } from '@/lib/types'
import { devtools } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

export interface State {
  id?: string
  title?: string
  stickers: Sticker[]
  instructionsOpen: boolean
  copied?: Sticker
}

interface Actions {
  addSticker: (size: Size) => void
  copySticker: (copied: Sticker) => void
  pasteSticker: () => void
  updateSticker: (updated: Sticker) => void
  removeSticker: (removed: Sticker) => void
  addPart: (added: Part) => void
  setInstructionsOpen: (isOpen: boolean) => void
  setTitle: (title: string) => void
}

export type Store = State & Actions

const initState: State = {
  stickers: [],
  instructionsOpen: true,
}

export const buildStore = (init: Partial<State> = {}) => {
  return createStore<Store>()(
    devtools((set, get) => ({
      ...initState,
      ...init,
      addSticker: (size) =>
        set((state) => ({
          stickers: [
            {
              id: Date.now().toString(),
              size,
              alignment: 'top-left',
              parts: [],
            },
            ...state.stickers,
          ],
        })),
      addPart: (added) =>
        set((state) => {
          if (!state.stickers.length) return {}
          const { id } = state.stickers[0]
          return {
            stickers: state.stickers.map((sticker) =>
              sticker.id === id
                ? {
                    ...sticker,
                    parts: [...sticker.parts, added],
                  }
                : sticker
            ),
          }
        }),
      updateSticker: (updated) =>
        set((state) => ({
          stickers: state.stickers.map((sticker) =>
            sticker.id === updated.id ? updated : sticker
          ),
        })),
      removeSticker: (removed) =>
        set((state) => ({
          stickers: state.stickers.filter(({ id }) => id !== removed.id),
        })),
      pasteSticker: async () => {
        const state = get()
        if (!state.copied) {
          try {
            const data = JSON.parse(await navigator.clipboard.readText())
            // TODO validate data
            if (data.id) {
              state.copied = data
            }
          } finally {
            navigator.clipboard.writeText('')
          }
        }
        if (state.copied) {
          set({
            stickers: [
              {
                ...state.copied,
                id: Date.now().toString(),
              },
              ...state.stickers,
            ],
            copied: undefined,
          })
        }
      },
      copySticker: (copied) => {
        navigator.clipboard.writeText(JSON.stringify(copied))
        set(() => ({ copied }))
      },
      setInstructionsOpen: (isOpen) =>
        set(() => ({ instructionsOpen: isOpen })),
      setTitle: (title: string) => set(() => ({ title })),
    }))
  )
}
