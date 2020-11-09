import Dropdown from "react-bootstrap/Dropdown"
import React from "react"
import Button from "react-bootstrap/Button"
import HoverableDropDownText from "./HoverableDropDownText"

const SortBySettings = ({ valuetypes, searchVariables, setFieldValue }) => {

  const isDescending = searchVariables.sortByDescending ?? false

  const handleOrderChange = () => {
    setFieldValue("sortByDescending", !isDescending)
  }

  const handleClick = (name) => {
    setFieldValue("sortByField", name)
  }

  const currentlySelected = valuetypes.find(item => item.name === searchVariables.sortByField)
  const showName = currentlySelected ? currentlySelected.displayName : "annoshinta"
  valuetypes = valuetypes.filter(item => item.displayName !== showName)

  return (
    <div style={{ display: "inline-block", marginTop: "0.5rem", marginRight: "0.5rem" }}>
      <Dropdown style={{ display: "inline-block" }}>
        <Dropdown.Toggle variant="dark">
          järjestys <b>{showName} {searchVariables.sortByField === "relevance" ? null : isDescending ? "↑" : "↓"}</b>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {searchVariables.sortByField === "relevance" ? null :
            <>
              <Dropdown.ItemText style={{ width: "max-content" }}>
                <Button variant="dark" style={{ marginLeft: "0.2rem" }} onClick={() => handleOrderChange()}>
                  {isDescending ? "suurin ensin ↑" : "pienin ensin ↓"}</Button>
              </Dropdown.ItemText>
              <Dropdown.Divider />
            </>
          }
          {valuetypes.map(item => (
            <HoverableDropDownText key={item.name} handleClick={() => handleClick(item.name)}>{item.displayName}</HoverableDropDownText>
          ))}
        </Dropdown.Menu>
      </Dropdown >
    </div >
  )
}

export default SortBySettings