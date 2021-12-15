import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

test('button has correct initial color', () => {
  render(<App />)
  // find an element with a role of button and text of "Change to blue"
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' })
  // click button
  fireEvent.click(colorButton)

  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' })
  expect(colorButton.textContent).toBe('Change to red')
})

test('initial conditions', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  // check that the button starts out enabled
  expect(colorButton).toBeEnabled()
  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).not.toBeChecked()
})

test('Checkbox change to checked', () => {
  render(<App />)
  // check that the
  const checkbox = screen.getByRole('checkbox')
  
  fireEvent.click(checkbox)
  expect(checkbox).toBeChecked()
  fireEvent.click(checkbox)
  expect(checkbox).not.toBeChecked()
})

test('Checkbox disables button on first click and enables on second', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  const checkbox = screen.getByRole('checkbox')

  fireEvent.click(checkbox)
  expect(colorButton).toBeDisabled()
  fireEvent.click(checkbox)
  expect(colorButton).toBeEnabled()
})
