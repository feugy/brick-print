import { describe, it, expect } from 'vitest'
import { trimText, fixName } from '@/lib/text'

describe('trimText()', () => {
  it('trims whitespace from each line', () => {
    const input = '  Hello  \n  World  \n  Test  '
    const expected = 'Hello\nWorld\nTest'
    expect(trimText(input)).toBe(expected)
  })

  it('allows empty lines', () => {
    const input = 'Hello\n\n\nWorld'
    const expected = 'Hello\n\n\nWorld'
    expect(trimText(input)).toBe(expected)
  })

  it('allows array input', () => {
    const input = ['  Hello  ', '  World  ', '  Test  ']
    const expected = 'Hello\nWorld\nTest'
    expect(trimText(input)).toBe(expected)
  })
})

describe('fixName()', () => {
  it('splits text into one line and trim', () => {
    const input = ' text is trimmed '
    const expected = 'text is trimmed'
    expect(fixName(input, 1)).toBe(expected)
  })

  it('splits text into two lines and trim', () => {
    const input = ' This is a long name that should be split '
    const expected = 'This is a long name\nthat should be split'
    expect(fixName(input)).toBe(expected)
  })

  it('splits text into three lines and trim', () => {
    const input = ' This is a long name that should be split '
    const expected = 'This is a\nlong name that\nshould be split'
    expect(fixName(input, 3)).toBe(expected)
  })

  it('handles empty input', () => {
    expect(fixName('')).toBe('')
  })
})
