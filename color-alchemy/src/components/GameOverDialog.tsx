import styled from 'styled-components'

interface GameOverDialogProps {
  isWin: boolean
  onTryAgain: () => void
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`

const Dialog = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-width: 280px;
`

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
`

const Message = styled.p`
  margin: 0;
  color: #555;
`

const Button = styled.button`
  margin-top: 8px;
  padding: 10px 24px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background: #222;
  color: #fff;

  &:hover {
    background: #444;
  }
`

const GameOverDialog = ({ isWin, onTryAgain }: GameOverDialogProps) => (
  <Overlay>
    <Dialog>
      <Title>{isWin ? 'You Win!' : 'Game Over'}</Title>
      <Message>{isWin ? 'You matched the target color!' : 'You ran out of moves.'}</Message>
      <Button onClick={onTryAgain}>Try Again</Button>
    </Dialog>
  </Overlay>
)

export default GameOverDialog
