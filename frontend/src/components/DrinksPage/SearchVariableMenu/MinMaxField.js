import React, { useState, useEffect } from "react"
import Dropdown from "react-bootstrap/Dropdown"
import Form from "react-bootstrap/Form"

const MinMaxField = ({ searchVariables, setFieldValue, item }) => {

  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)

  const minField = `min${item.name}`
  const maxField = `max${item.name}`

  useEffect(() => {
    setMin(searchVariables[minField])
    setMax(searchVariables[maxField])
  }, [searchVariables, minField, maxField])


  return (
    <Dropdown.ItemText key={item.name} style={{ width: "max-content" }}>
      <span style={{ width: "6rem", display: "inline-block" }}>{item.displayName}</span>
      <Form.Control
        onBlur={() => setFieldValue(minField, min)}
        onChange={(event) => setMin(Number(event.target.value))}
        type="number" name={minField} value={min} style={{ display: "inline-block", width: "5rem" }} placeholder="yli"
        min="0" max={searchVariables[maxField] ? Number(searchVariables[maxField]) - 1 : null}
      />
            -
      <Form.Control
        onBlur={() => setFieldValue(maxField, max)}
        onChange={(event) => setMax(Number(event.target.value))}
        type="number" name={maxField} value={max} style={{ display: "inline-block", width: "5rem" }} placeholder="alle"
        min={searchVariables[minField] ? Number(searchVariables[minField]) + 1 : 0}
      />
      <div className="input-group-append" style={{ display: "inline-block" }}>
        <span className="input-group-text">{item.unit}</span>
      </div>
    </Dropdown.ItemText>
  )
}

export default MinMaxField