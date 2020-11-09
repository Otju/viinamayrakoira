import Dropdown from "react-bootstrap/Dropdown"
import React from "react"
import MinMaxField from "./MinMaxField"


const MinMaxDropDown = ({ searchVariables, valuetypes, setFieldValue }) => {

  return (
    <Dropdown style={{ display: "inline-block", marginBottom: "0.5rem", marginTop: "0.5rem", marginRight: "0.5rem" }}>
      <Dropdown.Toggle variant="dark">
        yli/alle
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {valuetypes.map(item => <MinMaxField item={item} key={item.name} setFieldValue={setFieldValue} searchVariables={searchVariables} />)}
      </Dropdown.Menu>
    </Dropdown >
  )
}

export default MinMaxDropDown