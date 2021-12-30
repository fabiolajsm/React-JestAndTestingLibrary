import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('order phases for happy path', async () => {
  render(<App />)

  // add scoops and toppings
  const vanillaScoop = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  })
  userEvent.clear(vanillaScoop)
  userEvent.type(vanillaScoop, '4')

  const chocolateScoop = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  })
  userEvent.clear(chocolateScoop)
  userEvent.type(chocolateScoop, '5')

  const cherrieTopping = await screen.findByRole('checkbox', {
    name: 'Cherries',
  })
  userEvent.click(cherrieTopping)

  // find and click order button
  const orderButton = screen.getByRole('button', {
    name: /order sundae/i,
  })
  userEvent.click(orderButton)

  // check summary information based on order (subtotals)
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' })
  expect(summaryHeading).toBeInTheDocument()

  const scoopHeading = screen.getByRole('heading', { name: 'Scoops: $18.00' })
  expect(scoopHeading).toBeInTheDocument()

  const toppingHeading = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  })
  expect(toppingHeading).toBeInTheDocument()

  const totalHeading = screen.getByRole('heading', { name: 'Total: $19.50' })
  expect(totalHeading).toBeInTheDocument()

  // check summary option items
  expect(screen.getByText('4 Vanilla')).toBeInTheDocument()
  expect(screen.getByText('5 Chocolate')).toBeInTheDocument()
  expect(screen.getByText('Cherries')).toBeInTheDocument()

  // // alternatively...
  // // const optionItems = screen.getAllByRole('listitem');
  // // const optionItemsText = optionItems.map((item) => item.textContent);
  // // expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries']);

  // accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  })
  userEvent.click(tcCheckbox)

  const confirmOrderButton = screen.getByText(/confirm order/i)
  // const confirmOrderButton = screen.getByText('button', {
  //   name: /confirm order/i,
  // })                             ===> Dont take the button when are multiple buttons?? find this!!
  userEvent.click(confirmOrderButton)

  // confirm order number on confirmation page
  const orderNumber = await screen.findByText(/order number/i)
  expect(orderNumber).toBeInTheDocument()
  // this one is async bc there is a POST request to server in between summary and confirmation pages
  const thankYouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  })
  expect(thankYouHeader).toBeInTheDocument()

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole('button', {
    name: /create new order/i,
  })
  userEvent.click(newOrderButton)

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = screen.getByText('Scoops total: $0.00')
  expect(scoopsTotal).toBeInTheDocument()
  const toppingsTotal = screen.getByText('Toppings total: $0.00')
  expect(toppingsTotal).toBeInTheDocument()
  // wait for items to appear so that Testing Library doesn't get angry about stuff
  // happening after test is over
  await screen.findByRole('spinbutton', { name: 'Vanilla' })
  await screen.findByRole('checkbox', { name: 'Cherries' })
})
