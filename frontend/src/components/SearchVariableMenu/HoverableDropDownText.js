import Dropdown from 'react-bootstrap/Dropdown'
import React, { useState } from 'react'


const HoverableDropDownText = ({ content, handleSubmit }) => {
  const [isHover, setIsHover] = useState(false)

  return <Dropdown.ItemText style={{ backgroundColor: isHover ? "#acb2bd" : "white" }} onClick={() => handleSubmit()}
    onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
    {content}
  </Dropdown.ItemText>
}

export default HoverableDropDownText