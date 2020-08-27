import Dropdown from 'react-bootstrap/Dropdown'
import React from 'react'
import { Field } from 'formik'


const MinMaxDropDown = ({ searchVariables, valuetypes }) => {

  return (
    <Dropdown drop="right" style={{ display: "inline-block", marginBottom: "0.5rem", marginTop: "0.5rem", marginRight: "0.5rem", width: "20rem"}}>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        min/max
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {valuetypes.map(item => (
          <Dropdown.ItemText key={item.name}>
            <span style={{ width: "6rem", display: "inline-block" }}>{item.displayName}</span>
            <Field type="number" min="0" max={searchVariables[`max${item.name}`] ? searchVariables[`max${item.name}`] - 1 : null} name={`min${item.name}`} style={{ display: "inline-block", width: "5rem" }} placeholder="min" className="form-control" />
            -
            <Field type="number" min={searchVariables[`min${item.name}`] ? searchVariables[`min${item.name}`] + 1 : 0} name={`max${item.name}`} style={{ display: "inline-block", width: "5rem" }} placeholder="max" className="form-control" />
          </Dropdown.ItemText>
        ))}
      </Dropdown.Menu>
    </Dropdown >
  )
}

export default MinMaxDropDown