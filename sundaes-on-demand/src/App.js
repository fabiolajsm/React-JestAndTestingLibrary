import { useState } from 'react'
import { OrderDetailsProvider } from './contexts/OrderDetails'
import Container from 'react-bootstrap/Container'

import OrderEntry from './pages/entry/OrderEntry'
import OrderSummary from './pages/summary/OrderSummary'
import OrderConfirmation from './pages/confirmation/OrderConfirmation'

export default function App() {
  const [orderPhase, setOrderPhase] = useState('in progress')

  let Component = OrderEntry
  switch (orderPhase) {
    case 'review':
      Component = OrderSummary
      break
    case 'completed':
      Component = OrderConfirmation
      break
    default:
      Component = OrderEntry
      break
  }

  return (
    <Container>
      <OrderDetailsProvider>
        <Component setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
    </Container>
  )
}
