import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)
 
    const heading = screen.getAllByRole('heading', { level: 2 })
 
    expect(heading[0]).toBeInTheDocument()
  })
})