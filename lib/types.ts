export interface Part {
  id: string
  name: string
}

export interface Size {
  width: number
  height: number
}

export type Alignment =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'middle-center'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export interface Sticker {
  id: string
  size: Size
  parts: Part[]
  alignment: Alignment
}

export interface SaveResponse {
  success: boolean
  message: string
}

export interface Page {
  id: string
  title?: string
  stickers: Sticker[]
}

export type LoadResponse =
  | { success: true; page: Page }
  | { success: false; message: string }

export type ListResponse =
  | { success: true; pages: Page[] }
  | { success: false; message: string }
