import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import GameOverDialog from '../components/GameOverDialog'

describe('GameOverDialog', () => {
  it('shows "You Win!" when the player wins', () => {
    render(<GameOverDialog isWin onTryAgain={() => {}} />)
    expect(screen.getByText('You Win!')).toBeInTheDocument()
  })

  it('shows the win message when the player wins', () => {
    render(<GameOverDialog isWin onTryAgain={() => {}} />)
    expect(screen.getByText('You matched the target color!')).toBeInTheDocument()
  })

  it('shows "Game Over" when the player loses', () => {
    render(<GameOverDialog isWin={false} onTryAgain={() => {}} />)
    expect(screen.getByText('Game Over')).toBeInTheDocument()
  })

  it('shows the lose message when the player loses', () => {
    render(<GameOverDialog isWin={false} onTryAgain={() => {}} />)
    expect(screen.getByText('You ran out of moves.')).toBeInTheDocument()
  })

  it('calls onTryAgain when the button is clicked', () => {
    const onTryAgain = vi.fn()
    render(<GameOverDialog isWin={false} onTryAgain={onTryAgain} />)
    fireEvent.click(screen.getByText('Try Again'))
    expect(onTryAgain).toHaveBeenCalledTimes(1)
  })
})
