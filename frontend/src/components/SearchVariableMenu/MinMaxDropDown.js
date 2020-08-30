import Dropdown from 'react-bootstrap/Dropdown'
import React from 'react'
import { Field } from 'formik'


const MinMaxDropDown = ({ searchVariables, valuetypes, handleSubmit }) => {

  return (
    <Dropdown drop="right" style={{ display: "inline-block", marginBottom: "0.5rem", marginTop: "0.5rem", marginRight: "0.5rem" }}>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        yli/alle
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {valuetypes.map(item => (
          <Dropdown.ItemText key={item.name} style={{ width: "max-content" }}>
            <span style={{ width: "6rem", display: "inline-block" }}>{item.displayName}</span>
            <Field onBlur={() => handleSubmit()} type="number" min="0" max={searchVariables[`max${item.name}`] ? searchVariables[`max${item.name}`] - 1 : null}
              name={`min${item.name}`} style={{ display: "inline-block", width: "5rem" }} placeholder="yli" className="form-control" />
            -
            <Field onBlur={() => handleSubmit()} type="number" min={searchVariables[`min${item.name}`] ? searchVariables[`min${item.name}`] + 1 : 0}
              name={`max${item.name}`} style={{ display: "inline-block", width: "5rem" }} placeholder="alle" className="form-control" />
            <div class="input-group-append" style={{ display: "inline-block" }}>
              <span class="input-group-text">{item.unit}</span>
            </div>
          </Dropdown.ItemText>
        ))}
      </Dropdown.Menu>
    </Dropdown >
  )
}

export default MinMaxDropDown