import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { replaceCamelCaseWithSpaces } from './App'

test('button has correct initial color', () => {
  render(<App />)
  // find an element with a role of button and text of "Change to blue"
  const colorButton = screen.getByRole('button', {
    name: 'Change to MidnigthBlue',
  })
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' })
  // click button
  fireEvent.click(colorButton)

  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnigthBlue' })
  expect(colorButton.toHaveTextContent).toBe('Change to MediumVioletRed')
})

test('initial conditions', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', {
    name: 'Change to MidnigthBlue',
  })
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
  const colorButton = screen.getByRole('button', {
    name: 'Change to MidnigthBlue',
  })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(checkbox)
  expect(colorButton).toBeDisabled()
  fireEvent.click(checkbox)
  expect(colorButton).toBeEnabled()
})

test('Button change color to gray when is disabled', () => {
  render(<App />)
  const button = screen.getByRole('button', { name: 'Change to MidnigthBlue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(checkbox)
  expect(button).toHaveStyle({ backgroundColor: 'gray' })
  fireEvent.click(checkbox)
  expect(button).toHaveStyle({ backgroundColor: 'MediumVioletRed' })

  fireEvent.click(button)
  fireEvent.click(checkbox)
  expect(button).toHaveStyle({ backgroundColor: 'gray' })
  fireEvent.click(checkbox)
  expect(button).toHaveStyle({ backgroundColor: 'MidnigthBlue' })
})

// Unit testing example with medium violet red and midnigth blue
// We are going to combine the tests in a describe statement(Ds: way of grouping tests)
describe('Spaces before camelCase capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelCaseWithSpaces('Red')).toBe('Red')
  })
  test('Works for one inner capital letter', () => {
    expect(replaceCamelCaseWithSpaces('MidnigthBlue')).toBe('Midnigth Blue')
  })
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelCaseWithSpaces('MediumVioletRed')).toBe(
      'Medium Violet Red',
    )
  })
})
