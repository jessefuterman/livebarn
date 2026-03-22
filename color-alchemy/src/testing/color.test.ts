import { describe, it, expect } from 'vitest'
import {
  toRgb,
  colorDifference,
  calculateTileColors,
  BLACK,
  RED,
} from '../utils/color'
import { makeBlackSources } from './testUtils'

describe('toRgb', () => {
  it('converts an RGBColor tuple to a CSS string', () => {
    expect(toRgb([255, 0, 0])).toBe('rgb(255, 0, 0)')
    expect(toRgb([0, 255, 0])).toBe('rgb(0, 255, 0)')
    expect(toRgb([0, 0, 255])).toBe('rgb(0, 0, 255)')
    expect(toRgb([0, 0, 0])).toBe('rgb(0, 0, 0)')
  })
})

describe('colorDifference', () => {
  it('returns 0 for identical colors', () => {
    expect(colorDifference([255, 0, 0], [255, 0, 0])).toBe(0)
    expect(colorDifference(BLACK, BLACK)).toBe(0)
  })

  it('returns 1 for maximum difference (black vs white)', () => {
    expect(colorDifference([0, 0, 0], [255, 255, 255])).toBeCloseTo(1)
  })

  it('returns the correct value for a known color pair', () => {
    expect(colorDifference([255, 0, 0], [0, 255, 0])).toBeCloseTo(Math.sqrt(2 / 3))
  })
})

describe('calculateTileColors', () => {
  it('returns all black tiles when all sources are black', () => {
    const sources = makeBlackSources(3, 2)
    const tiles = calculateTileColors(sources, 3, 2)

    expect(tiles).toHaveLength(2)
    expect(tiles[0]).toHaveLength(3)
    tiles.forEach(row => row.forEach(tile => expect(tile).toEqual([0, 0, 0])))
  })

  it('returns the correct grid dimensions', () => {
    const sources = makeBlackSources(10, 4)
    const tiles = calculateTileColors(sources, 10, 4)

    expect(tiles).toHaveLength(4)
    tiles.forEach(row => expect(row).toHaveLength(10))
  })

  it('matches the exact values from the spec (single top source, 4 rows)', () => {
    const sources = makeBlackSources(1, 4)
    sources.top[0] = RED

    const tiles = calculateTileColors(sources, 1, 4)

    expect(tiles[0][0][0]).toBe(Math.round(255 * 4 / 5))
    expect(tiles[1][0][0]).toBe(Math.round(255 * 3 / 5))
    expect(tiles[2][0][0]).toBe(Math.round(255 * 2 / 5))
    expect(tiles[3][0][0]).toBe(Math.round(255 * 1 / 5))
  })

  it('tiles closer to a colored source are brighter', () => {
    const sources = makeBlackSources(3, 2)
    sources.left[0] = RED

    const tiles = calculateTileColors(sources, 3, 2)

    expect(tiles[0][0][0]).toBeGreaterThan(tiles[0][2][0])
  })

  it('tiles in unaffected rows stay black when only one row source is set', () => {
    const sources = makeBlackSources(3, 2)
    sources.left[0] = RED

    const tiles = calculateTileColors(sources, 3, 2)

    tiles[1].forEach(tile => expect(tile).toEqual([0, 0, 0]))
  })


  it('does not let any channel exceed 255', () => {
    const sources = makeBlackSources(3, 2)
    sources.left = [[255, 0, 0], [255, 0, 0]]
    sources.right = [[255, 0, 0], [255, 0, 0]]
    sources.top = [[255, 0, 0], [255, 0, 0], [255, 0, 0]]
    sources.bottom = [[255, 0, 0], [255, 0, 0], [255, 0, 0]]

    const tiles = calculateTileColors(sources, 3, 2)
    tiles.forEach(row => row.forEach(([r, g, b]) => {
      expect(r).toBeLessThanOrEqual(255)
      expect(g).toBeLessThanOrEqual(255)
      expect(b).toBeLessThanOrEqual(255)
    }))
  })
})
