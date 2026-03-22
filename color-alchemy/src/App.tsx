import styled from 'styled-components'
import Grid from './components/Grid'
import InfoPanel from './components/InfoPanel'
import GameOverDialog from './components/GameOverDialog'
import useGameState from './hooks/useGameState'

const Wrapper = styled.div`
  padding: 32px;
`

const Title = styled.h1`
  margin: 0 0 16px;
  font-size: 20px;
`

function App() {
  const state = useGameState()

  if (state.error) return <p>Something went wrong: {state.error}</p>
  if (!state.gameData) return <p>Loading...</p>

  const {
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
  } = state

  return (
    <Wrapper>
      <Title>RGB Alchemy</Title>
      {isGameOver && <GameOverDialog isWin={isWin} onTryAgain={restartGame} />}
      <InfoPanel
        userId={gameData.userId}
        movesLeft={movesLeft}
        target={gameData.target}
        closestColor={closestColor}
        closestDiff={closestDiff}
      />
      <Grid
        width={gameData.width}
        height={gameData.height}
        tiles={tiles}
        sources={sources}
        closestTile={closestTile}
        canClickSources={canClickSources}
        canDragTiles={canDragTiles}
        onSourceClick={handleSourceClick}
        onTileDragStart={handleTileDragStart}
        onSourceDrop={handleSourceDrop}
      />
    </Wrapper>
  )
}

export default App
