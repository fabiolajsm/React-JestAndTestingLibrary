import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Scoops from '../ScoopOption'

test('Check if is an invalid input', () => {
  render(<Scoops name="" imagePath="" updateItemCount={jest.fn()} />)

  // expect input to be invalid with negative number
  const spinButton = screen.getByRole('spinbutton')
  userEvent.clear(spinButton)
  userEvent.type(spinButton, '-1')
  expect(spinButton).toHaveClass('form-control is-valid')

  // expect input to be invalid with decimal input
  userEvent.clear(spinButton)
  userEvent.type(spinButton, '5.6')
  expect(spinButton).toHaveClass('form-control is-valid')

  // invalid input with number too high
  userEvent.clear(spinButton)
  userEvent.type(spinButton, '11')
  expect(spinButton).toHaveClass('form-control is-valid')

  // valid input to pass
  userEvent.clear(spinButton)
  userEvent.type(spinButton, '2')
  expect(spinButton).not.toHaveClass('form-control is-valid')
})
