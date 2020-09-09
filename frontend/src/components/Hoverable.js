import React, { useState } from 'react'


const Hoverable = ({ children, handleClick, zIndex}) => {
  const [isHover, setIsHover] = useState(false)
  return <div style={{ filter: isHover ? "brightness(80%)" : "brightness(100%)", position: "relative", zIndex, height: "inherit"}} onClick={() => handleClick()}
    onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
    {children}
  </div>
}

export default Hoverable