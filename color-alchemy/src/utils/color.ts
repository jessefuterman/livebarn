export type RGBColor = [number, number, number]

export interface Sources {
  top: RGBColor[]
  bottom: RGBColor[]
  left: RGBColor[]
  right: RGBColor[]
}

export const BLACK: RGBColor = [0, 0, 0]
export const RED: RGBColor = [255, 0, 0]
export const GREEN: RGBColor = [0, 255, 0]
export const BLUE: RGBColor = [0, 0, 255]

export const EARLY_GAME_COLORS: RGBColor[] = [RED, GREEN, BLUE]

export const toRgb = ([r, g, b]: RGBColor): string => `rgb(${r}, ${g}, ${b})`


const sourceContribution = (color: RGBColor, distance: number, total: number): RGBColor => {
  const factor = (total - distance) / total
  return [color[0] * factor, color[1] * factor, color[2] * factor]
}


export const calculateTileColors = (sources: Sources, width: number, height: number): RGBColor[][] => {
  return Array.from({ length: height }, (_, r) =>
    Array.from({ length: width }, (_, c) => {
      const contributions = [
        sourceContribution(sources.left[r], c + 1, width + 1),
        sourceContribution(sources.right[r], width - c, width + 1),
        sourceContribution(sources.top[c], r + 1, height + 1),
        sourceContribution(sources.bottom[c], height - r, height + 1),
      ]

      const rawR = contributions.reduce((sum, [r]) => sum + r, 0)
      const rawG = contributions.reduce((sum, [, g]) => sum + g, 0)
      const rawB = contributions.reduce((sum, [, , b]) => sum + b, 0)

      
      const lambda = Math.min(1, 255 / Math.max(rawR, rawG, rawB, 1))

      return [
        Math.round(lambda * rawR),
        Math.round(lambda * rawG),
        Math.round(lambda * rawB),
      ] as RGBColor
    })
  )
}

export const colorDifference = (a: RGBColor, b: RGBColor): number => {
  const sumofSquares = (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
  return Math.sqrt(sumofSquares) / Math.sqrt(255 ** 2 * 3)
}
