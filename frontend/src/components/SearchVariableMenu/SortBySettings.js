import Dropdown from 'react-bootstrap/Dropdown'
import React from 'react'
import Button from 'react-bootstrap/Button'
import HoverableDropDownText from './HoverableDropDownText'

const SortBySettings = ({ valuetypes, searchVariables, setFieldValue, handleSubmit }) => {

  const isDescending = searchVariables.sortByDescending ?? false

  const handleOrderChange = () => {
    setFieldValue("sortByDescending", !isDescending)
    handleSubmit()
  }

  const handleClick = (name) => {
    setFieldValue("sortByField", name)
    handleSubmit()
  }

  const currentlySelected = valuetypes.find(item => item.name === searchVariables.sortByField)
  const showName = currentlySelected ? currentlySelected.displayName : "annoshinta"
  valuetypes = valuetypes.filter(item => item.displayName !== showName)

  return (
    <div style={{ display: "inline-block", marginTop: "0.5rem", marginRight: "0.5rem" }}>
      <Dropdown drop="right" style={{ display: "inline-block" }}>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          järjestys
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.ItemText style={{ width: "max-content" }}>
            <b>{showName}</b>
            <Button variant="dark" style={{ marginLeft: "0.2rem"}} onClick={() => handleOrderChange()}>{isDescending ? "↑" : "↓"}</Button>
          </Dropdown.ItemText>
          <Dropdown.Divider />
          {valuetypes.map(item => (
            <HoverableDropDownText key={item.name} handleClick={() => handleClick(item.name)}>{item.displayName}</HoverableDropDownText>
          ))}
        </Dropdown.Menu>
      </Dropdown >
    </div >
  )
}

export default SortBySettings