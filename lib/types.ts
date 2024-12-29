export interface Part {
  id: string
  name: string
}

export interface Size {
  width: number
  height: number
  unit: 'mm'
}

export interface Sticker {
  id: string
  size: Size
  parts: Part[]
}
