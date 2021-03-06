import { useState } from 'react'
import './App.css'

export function replaceCamelCaseWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}

export default function App() {
  const [buttonColor, setButtonColor] = useState('MediumVioletRed')
  const [disabled, setDisabled] = useState(false)
  const newButtonColor =
    buttonColor === 'MediumVioletRed' ? 'MidnigthBlue' : 'MediumVioletRed'

  return (
    <div>
      <button
        style={{
          backgroundColor: disabled ? 'gray' : buttonColor,
          color: 'white',
        }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}
      >
        Change to {newButtonColor}
      </button>
      <input
        id="disable-button-checkbox"
        type="checkbox"
        value={disabled}
        arial-checked={disabled}
        onChange={(e) => {
          setDisabled(e.target.checked)
        }}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  )
}
