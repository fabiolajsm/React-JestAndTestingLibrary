import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
// import { OrderDetailsProvider } from '../../../contexts/OrderDetails'
import Options from '../Options'
import OrderEntry from '../OrderEntry'

test('update scoop subtotal when scoops change', async () => {
  // render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider }) // this is the wrapper option
  render(<Options optionType="scoops" />)
  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('0.00')
  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })

  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')
  expect(scoopsSubtotal).toHaveTextContent('2.00')

  // update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  })

  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('6.00')
})

test('update toppings subtotal when toppings change', async () => {
  render(<Options optionType="toppings" />)
  // make sure total starts out $0.00
  const toppingSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  })
  expect(toppingSubtotal).toHaveTextContent('0.00')

  // update cherrie topping to 1 and check the subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: 'Cherries',
  })
  userEvent.click(cherriesCheckbox)
  expect(toppingSubtotal).toHaveTextContent('1.50')

  // add hot fudge and check subtotal
  const hotFudgeCheckbox = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  })
  userEvent.click(hotFudgeCheckbox)
  expect(toppingSubtotal).toHaveTextContent('3.00')

  // remove hot fudge and check subtotal
  userEvent.click(hotFudgeCheckbox)
  expect(toppingSubtotal).toHaveTextContent('1.50')
})

describe('Grand total', () => {
  test('Initial condition is zero', () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
      exact: false,
    })
    expect(grandTotal).toHaveTextContent('0.00')
  })

  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    })
    // added a scoop
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')
    expect(grandTotal).toHaveTextContent('2.00')

    // added a topping
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })
    userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('3.50')
  })

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    })
    // added a topping
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })
    userEvent.click(cherriesCheckbox)
    // added two scoops
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    })
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '2')

    expect(grandTotal).toHaveTextContent('5.50')
  })

  test('grand total updates properly if an item is removed', async () => {
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    })
    // added a topping
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    })
    userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('1.50')
    userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('0.00')
  })
})
