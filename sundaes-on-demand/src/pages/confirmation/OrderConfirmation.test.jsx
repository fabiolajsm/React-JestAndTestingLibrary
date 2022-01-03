import { render, screen } from '../../test-utils/testing-library-utils'
import { server } from '../../mocks/server'
import { rest } from 'msw'

import OrderConfirmation from './OrderConfirmation'

test('Error response for submitting order', async () => {
  // override default msw response for options endpoint with error response
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (req, res, ctx) => {
      res(ctx.status(500))
    }),
  )

  render(<OrderConfirmation setOrderPhase={jest.fn()} />)

  const alert = await screen.findByRole('alert')
  expect(alert).toHaveTextContent(
    'An unexpected error ocurred. Please try again later',
  )
})
