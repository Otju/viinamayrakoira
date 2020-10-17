import React, { useState } from 'react'
import { useHistory } from "react-router-dom"


const Hoverable = ({ children, handleClick, zIndex, link }) => {
  const [isHover, setIsHover] = useState(false)
  const history = useHistory()

  if (link) {
    handleClick = () => {
      history.push(`/${link}`)
    }
  }

  return <div style={{ filter: isHover ? "brightness(80%)" : "brightness(100%)", position: "relative", zIndex, height: "inherit" }} onClick={() => handleClick()}
    onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
    {children}
  </div>
}

export default Hoverable
