import { render, screen, fireEvent } from '@testing-library/react'
import SummaryForm from '../SummaryForm'

test('The checkbox is unchecked and the button disabled by default', () => {
  render(<SummaryForm />)
  const checkboxAgree = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  })
  const confirmButton = screen.getByRole('button', { name: 'Confirm order' })
  expect(checkboxAgree).not.toBeChecked()
  expect(confirmButton).toBeDisabled()
})

test('After click, checkbox is checked and button is enabled', () => {
  render(<SummaryForm />)
  const checkboxAgree = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  })
  const buttonConfirm = screen.getByRole('button', { name: 'Confirm order' })
  fireEvent.click(checkboxAgree)
  expect(checkboxAgree).toBeChecked()
  expect(buttonConfirm).toBeEnabled()

  fireEvent.click(checkboxAgree)
  expect(checkboxAgree).not.toBeChecked()
  expect(buttonConfirm).toBeDisabled()
})
