import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import InfoPanel from '../components/InfoPanel'

const defaultProps = {
  userId: 'abc123',
  movesLeft: 5,
  target: [0, 255, 255] as [number, number, number],
  closestColor: [0, 0, 0] as [number, number, number],
  closestDiff: 0.5,
}

describe('InfoPanel', () => {
  it('displays the user ID', () => {
    render(<InfoPanel {...defaultProps} />)
    expect(screen.getByText('abc123')).toBeInTheDocument()
  })

  it('displays the moves left', () => {
    render(<InfoPanel {...defaultProps} />)
    const movesSection = screen.getByText('Moves Left').parentElement!
    expect(movesSection).toHaveTextContent('5')
  })

  it('displays 0 moves left', () => {
    render(<InfoPanel {...defaultProps} movesLeft={0} />)
    const movesSection = screen.getByText('Moves Left').parentElement!
    expect(movesSection).toHaveTextContent('0')
  })

  it('displays the color difference as a percentage', () => {
    render(<InfoPanel {...defaultProps} />)
    expect(screen.getByText(/50\.00%/)).toBeInTheDocument()
  })

  it('formats the diff to 2 decimal places', () => {
    render(<InfoPanel {...defaultProps} closestDiff={0.8165} />)
    expect(screen.getByText(/81\.65%/)).toBeInTheDocument()
  })

  it('shows 0.00% when closest color matches target exactly', () => {
    render(<InfoPanel {...defaultProps} closestDiff={0} />)
    expect(screen.getByText(/0\.00%/)).toBeInTheDocument()
  })
})
