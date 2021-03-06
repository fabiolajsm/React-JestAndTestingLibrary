import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useOrderDetails } from '../../contexts/OrderDetails'

import AlertBanner from '../common/AlertBanner'

export default function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(0)
  const [, , resetOrder] = useOrderDetails()
  const [error, setError] = useState(false)

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber)
      })
      .catch((err) => setError(true))
  }, [])

  if (error) {
    return <AlertBanner message={null} variant={null} />
  }

  function handleClick() {
    resetOrder()
    setOrderPhase('in progress')
  }

  return (
    <div style={{ textAlign: 'center', margin: '5%' }}>
      {!orderNumber ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h2>Thank you!</h2>
          <h3>Your order number is {orderNumber}</h3>
          <p>as per our terms and conditions, nothing will happen now</p>
          <Button variant="primary" onClick={handleClick}>
            Create new order
          </Button>
        </div>
      )}
    </div>
  )
}
