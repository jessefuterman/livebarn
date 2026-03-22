import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Source from '../components/Source'

describe('Source', () => {
  it('renders with the correct background color', () => {
    render(<Source color={[255, 0, 0]} />)
    const source = screen.getByTitle('rgb(255, 0, 0)')
    expect(source).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' })
  })

  it('shows a tooltip with the rgb color string', () => {
    render(<Source color={[0, 0, 255]} />)
    expect(screen.getByTitle('rgb(0, 0, 255)')).toBeInTheDocument()
  })

  it('calls onClick when clicked and isClickable is true', () => {
    const onClick = vi.fn()
    render(<Source color={[0, 0, 0]} isClickable onClick={onClick} />)
    fireEvent.click(screen.getByTitle('rgb(0, 0, 0)'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when isClickable is false', () => {
    const onClick = vi.fn()
    render(<Source color={[0, 0, 0]} isClickable={false} onClick={onClick} />)
    fireEvent.click(screen.getByTitle('rgb(0, 0, 0)'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('calls onDrop when a tile is dropped and isDroppable is true', () => {
    const onDrop = vi.fn()
    render(<Source color={[0, 0, 0]} isDroppable onDrop={onDrop} />)
    fireEvent.drop(screen.getByTitle('rgb(0, 0, 0)'))
    expect(onDrop).toHaveBeenCalledTimes(1)
  })

  it('does not call onDrop when isDroppable is false', () => {
    const onDrop = vi.fn()
    render(<Source color={[0, 0, 0]} isDroppable={false} onDrop={onDrop} />)
    fireEvent.drop(screen.getByTitle('rgb(0, 0, 0)'))
    expect(onDrop).not.toHaveBeenCalled()
  })
})
