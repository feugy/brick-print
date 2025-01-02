import type { Part, Sticker } from '@/lib/types'
import { devtools } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

export interface State {
  id?: string
  title?: string
  stickers: Sticker[]
  instructionsOpen: boolean
}

interface Actions {
  addSticker: (added: Sticker) => void
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

export const buildStore = (init: Partial<State> = {}) =>
  createStore<Store>()(
    devtools((set) => ({
      ...initState,
      ...init,
      addSticker: (added) =>
        set((state) => ({ stickers: [added, ...state.stickers] })),
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
      setInstructionsOpen: (isOpen) =>
        set(() => ({ instructionsOpen: isOpen })),
      setTitle: (title: string) => set(() => ({ title })),
    }))
  )
