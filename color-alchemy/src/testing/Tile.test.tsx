import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Tile from '../components/Tile'

describe('Tile', () => {
  it('renders with the correct background color', () => {
    render(<Tile color={[255, 0, 0]} />)
    const tile = screen.getByTitle('rgb(255, 0, 0)')
    expect(tile).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' })
  })

  it('shows a tooltip with the rgb color string', () => {
    render(<Tile color={[0, 255, 0]} />)
    expect(screen.getByTitle('rgb(0, 255, 0)')).toBeInTheDocument()
  })

  it('is not draggable by default', () => {
    render(<Tile color={[0, 0, 0]} />)
    const tile = screen.getByTitle('rgb(0, 0, 0)')
    expect(tile).not.toHaveAttribute('draggable', 'true')
  })

  it('is draggable when draggable prop is true', () => {
    render(<Tile color={[0, 0, 0]} draggable />)
    const tile = screen.getByTitle('rgb(0, 0, 0)')
    expect(tile).toHaveAttribute('draggable', 'true')
  })

  it('calls onDragStart when dragged', () => {
    const onDragStart = vi.fn()
    render(<Tile color={[0, 0, 255]} draggable onDragStart={onDragStart} />)
    fireEvent.dragStart(screen.getByTitle('rgb(0, 0, 255)'), {
      dataTransfer: { setDragImage: vi.fn() },
    })
    expect(onDragStart).toHaveBeenCalledTimes(1)
  })

  it('does not call onDragStart when not draggable', () => {
    const onDragStart = vi.fn()
    render(<Tile color={[0, 0, 255]} draggable={false} onDragStart={onDragStart} />)
    fireEvent.dragStart(screen.getByTitle('rgb(0, 0, 255)'), {
      dataTransfer: { setDragImage: vi.fn() },
    })
    expect(onDragStart).not.toHaveBeenCalled()
  })
})
