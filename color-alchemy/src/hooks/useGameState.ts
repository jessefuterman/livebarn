import { useState, useEffect, useRef } from 'react'
import {
  type Sources,
  BLACK,
  RED,
  EARLY_GAME_COLORS,
  calculateTileColors,
  colorDifference,
} from '../utils/color'
import { type SourcePosition, type GameData } from '../types'

const API_BASE_URL = 'http://localhost:9876'
const WIN_THRESHOLD = 0.1

const initSources = (width: number, height: number): Sources => ({
  top: Array.from({ length: width }, () => BLACK),
  bottom: Array.from({ length: width }, () => BLACK),
  left: Array.from({ length: height }, () => BLACK),
  right: Array.from({ length: height }, () => BLACK),
})

const useGameState = () => {
  const [gameData, setGameData] = useState<GameData | null>(null)
  const [sources, setSources] = useState<Sources | null>(null)
  const [movesLeft, setMovesLeft] = useState(0)
  const [draggedTile, setDraggedTile] = useState<[number, number] | null>(null)
  const [fetchKey, setFetchKey] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const userIdRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    const load = async () => {
      setError(null)
      try {
        const url = userIdRef.current
          ? `${API_BASE_URL}/init/user/${userIdRef.current}`
          : `${API_BASE_URL}/init`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        const data = await res.json()
        userIdRef.current = data.userId
        setGameData({ userId: data.userId, width: data.width, height: data.height, maxMoves: data.maxMoves, target: data.target })
        setSources(initSources(data.width, data.height))
        setMovesLeft(data.maxMoves)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect to server')
      }
    }
    load()
  }, [fetchKey])

  const restartGame = () => setFetchKey(k => k + 1)

  if (error) return { error, gameData: null, restartGame }
  if (!gameData || !sources) return { error: null, gameData: null, restartGame }

  const tiles = calculateTileColors(sources, gameData.width, gameData.height)

  const movesUsed = gameData.maxMoves - movesLeft
  const canClickSources = movesUsed < 3
  const canDragTiles = movesUsed >= 3 && movesLeft > 0

  let closestTile: [number, number] = [0, 0]
  let closestDiff = Infinity
  for (let r = 0; r < gameData.height; r++) {
    for (let c = 0; c < gameData.width; c++) {
      const diff = colorDifference(tiles[r][c], gameData.target)
      if (diff < closestDiff) {
        closestDiff = diff
        closestTile = [r, c]
      }
    }
  }

  const closestColor = tiles[closestTile[0]][closestTile[1]]
  const isWin = closestDiff < WIN_THRESHOLD
  const isGameOver = isWin || movesLeft === 0

  const handleSourceClick = (position: SourcePosition, index: number) => {
    if (!canClickSources) return
    const color = EARLY_GAME_COLORS[movesUsed] ?? RED
    const updated = [...sources[position]]
    updated[index] = color
    setSources({ ...sources, [position]: updated })
    setMovesLeft(movesLeft - 1)
  }

  const handleTileDragStart = (row: number, col: number) => {
    setDraggedTile([row, col])
  }

  const handleSourceDrop = (position: SourcePosition, index: number) => {
    if (!draggedTile) return
    const [row, col] = draggedTile
    const color = tiles[row][col]
    const updated = [...sources[position]]
    updated[index] = color
    setSources({ ...sources, [position]: updated })
    setDraggedTile(null)
    setMovesLeft(movesLeft - 1)
  }

  return {
    error: null,
    gameData,
    sources,
    tiles,
    movesLeft,
    closestTile,
    closestColor,
    closestDiff,
    isWin,
    isGameOver,
    canClickSources,
    canDragTiles,
    handleSourceClick,
    handleTileDragStart,
    handleSourceDrop,
    restartGame,
  }
}

export default useGameState
