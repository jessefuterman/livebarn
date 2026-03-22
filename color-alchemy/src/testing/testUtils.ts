import { type RGBColor, type Sources } from '../utils/color'

export const makeBlackSources = (width: number, height: number): Sources => ({
  top: Array.from({ length: width }, (): RGBColor => [0, 0, 0]),
  bottom: Array.from({ length: width }, (): RGBColor => [0, 0, 0]),
  left: Array.from({ length: height }, (): RGBColor => [0, 0, 0]),
  right: Array.from({ length: height }, (): RGBColor => [0, 0, 0]),
})
