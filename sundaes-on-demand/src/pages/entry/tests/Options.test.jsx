import { render, screen } from '@testing-library/react' // better render with the global but in this cases is just to see it
import { OrderDetailsProvider } from '../../../contexts/OrderDetails'
import Options from '../Options'

test('display image for each scoop option from server (mocks)', async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider })
  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2)

  // confirm all text of images
  const altText = scoopImages.map((element) => element.alt)
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('display image for each topping option from server', async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider })
  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i })
  expect(toppingImages).toHaveLength(3)

  const altText = toppingImages.map((el) => el.alt)
  expect(altText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ])
})
