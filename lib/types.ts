export interface Part {
  id: string
  name: string
}

export interface Size {
  width: number
  height: number
}

export interface Sticker {
  id: string
  size: Size
  parts: Part[]
}
