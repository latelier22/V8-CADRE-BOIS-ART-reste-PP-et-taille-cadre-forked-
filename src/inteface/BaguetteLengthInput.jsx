import React, { useState, useEffect } from 'react'

const BaguetteLengthInput = ({ label, initialValue, onLengthChange, maxValue, minValue }) => {
  const [length, setLength] = useState(initialValue)

  const handleChange = (event) => {
    const value = parseFloat(event.target.value)
    setLength(value)
    onLengthChange(value)
  }

  useEffect(() => {
    onLengthChange(initialValue)
  }, [])

  return (
    <div>
      <label htmlFor={`baguette${label}Input`}>{` ${label}:`}</label>
      <input type="number" id={`baguette${label}Input`} value={length} onChange={handleChange} min={minValue} max={maxValue} step="0.5" />
      <span> cm</span>
    </div>
  )
}

export default BaguetteLengthInput
