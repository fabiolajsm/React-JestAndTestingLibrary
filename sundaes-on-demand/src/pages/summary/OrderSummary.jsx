import { useOrderDetails } from '../../contexts/OrderDetails'
import SummaryForm from './SummaryForm'

export default function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails()

  const scoopArray = Array.from(orderDetails.scoops.entries())
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ))

  const toppingsArray = Array.from(orderDetails.toppings.keys())
  const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>)

  return (
    <div>
      <h2>Order Summary</h2>
      <h3>Scoops: {orderDetails.totals.scoops}</h3>
      <ul>{scoopList}</ul>
      <h3>Toppings: {orderDetails.totals.toppings}</h3>
      <ul>{toppingList}</ul>
      <h3>Total: {orderDetails.totals.grandTotal}</h3>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  )
}
