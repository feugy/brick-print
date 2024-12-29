import { improveQuery } from '@/lib/query'
import { describe, expect, it } from 'vitest'

describe('improveQuery', () => {
  it('replaces "x" when bordered by spaces', () => {
    expect(improveQuery('2 x 3')).toBe('2 × 3')
    expect(improveQuery('a x b x c')).toBe('a × b × c')
  })

  it('replaces "x" when bordered by numbers', () => {
    // Does not work: expect(improveQuery('4x5x6')).toBe('4×5×6')
    expect(improveQuery('2x3')).toBe('2×3')
  })

  it('replaces "x" when at the start or end of the string', () => {
    expect(improveQuery('x 2')).toBe('× 2')
    expect(improveQuery('2 x')).toBe('2 ×')
  })

  it('does not replace inside words', () => {
    expect(improveQuery('axb')).toBe('axb')
    expect(improveQuery('max')).toBe('max')
    expect(improveQuery('xray')).toBe('xray')
  })

  it('handles multiple replacements in a single string', () => {
    expect(improveQuery('1x2 3 x 4 5x6')).toBe('1×2 3 × 4 5×6')
  })

  it('handles empty strings', () => {
    expect(improveQuery('')).toBe('')
  })

  it('handles strings without any "x" characters', () => {
    expect(improveQuery('Hello, world!')).toBe('Hello, world!')
  })
})
