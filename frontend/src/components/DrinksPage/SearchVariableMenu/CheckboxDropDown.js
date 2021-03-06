import React from "react"
import Dropdown from "react-bootstrap/Dropdown"
import HoverableDropDownText from "./HoverableDropDownText"
import { capitalizeFirst } from "../../../utils"

const CheckboxDropDown = ({ searchVariables, setFieldValue, displayName, name, values }) => {

  const allSelected = searchVariables[name].length === values.length

  const handleClick = (item, name, selected) => {

    if (selected) {
      setFieldValue(name, searchVariables[name].filter(searchVar => searchVar !== item))
    } else {
      setFieldValue(name, [...searchVariables[name] ?? [], item])
    }
  }

  const handleSelectAll = () => {
    if (allSelected) {
      setFieldValue(name, [])
    } else {
      setFieldValue(name, values.map(value => value.name))
    }
  }

  return (
    <Dropdown style={{ display: "inline-block", marginTop: "0.5rem", marginRight: "0.5rem" }}>
      <Dropdown.Toggle variant="dark">
        {displayName}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <HoverableDropDownText handleClick={() => handleSelectAll()} selected={allSelected}>
          Valitse kaikki
        </HoverableDropDownText>
        {values.map(item => {
          let selected = false
          if (searchVariables[name] && searchVariables[name].find(searchVar => searchVar === item.name)) {
            selected = true
          }
          return (
            <HoverableDropDownText key={item.name} selected={selected} handleClick={() => handleClick(item.name, name, selected)}>
              {name === "category" ?
                <div style={{ width: "1rem", height: "1rem", display: "inline-block", background: item.color, marginRight: "0.1rem" }}></div>
                : null}
              {item.displayName ? item.displayName : capitalizeFirst(item.name)}
            </HoverableDropDownText>
          )
        })}
      </Dropdown.Menu>
    </Dropdown >
  )
}

export default CheckboxDropDown