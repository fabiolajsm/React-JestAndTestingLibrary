import axios from 'axios'
import { useEffect, useState } from 'react'
import ScoopOption from './ScoopOption'
import Row from 'react-bootstrap/Row'
import ToppingOption from './ToppingOption'
import AlertBanner from '../common/AlertBanner'

export default function Options({ optionType }) {
  // optionType is "scoops" or "toppings"
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    axios
      .get(`http:localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((err) => setError(true))
  }, [optionType])

  if (error) {
    return <AlertBanner />
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ))
  return <Row>{optionItems}</Row>
}