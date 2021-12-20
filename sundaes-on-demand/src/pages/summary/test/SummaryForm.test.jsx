import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import SummaryForm from '../SummaryForm'
import userEvent from '@testing-library/user-event'

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
  userEvent.click(checkboxAgree)
  expect(checkboxAgree).toBeChecked()
  expect(buttonConfirm).toBeEnabled()

  userEvent.click(checkboxAgree)
  expect(checkboxAgree).not.toBeChecked()
  expect(buttonConfirm).toBeDisabled()
})

test('Popover responds to hover', async () => {
  render(<SummaryForm />)
  // popover stars out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i,
  )
  expect(nullPopover).not.toBeInTheDocument()

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  userEvent.hover(termsAndConditions) // aqui falla whaaaaat???

  const popover = screen.getByText(/no ice cream will actually be delivered/i) // this will throw an error but
  expect(popover).toBeInTheDocument() // put this is best practice bc makes the code more readable.

  // popover disappears when mouse out
  userEvent.unhover(termsAndConditions)
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i),
  ) 
  // expect(waitForElementToBeRemoved).not.toBeInTheDocument() => No anymore
})
