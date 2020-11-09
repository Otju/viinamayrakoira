import Dropdown from "react-bootstrap/Dropdown"
import React from "react"
import Hoverable from "../../General/Hoverable"


const HoverableDropDownText = ({ children, handleClick, selected }) => {
  return <Hoverable handleClick={handleClick} style={{width: "100%"}}>
    <Dropdown.ItemText style={{ fontWeight: selected ? "bold" : "normal", minWidth: "max-content", background: "white"}}>
      {children}
      {selected ? <span aria-hidden="true">    &times;</span> : null}
    </Dropdown.ItemText>
  </Hoverable>
}

export default HoverableDropDownText