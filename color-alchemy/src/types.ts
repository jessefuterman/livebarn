import type { RGBColor } from './utils/color'

export type SourcePosition = 'top' | 'bottom' | 'left' | 'right'

export interface GameData {
  userId: string
  width: number
  height: number
  maxMoves: number
  target: RGBColor
}
