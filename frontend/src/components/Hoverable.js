import React, { useState } from 'react'


const Hoverable = ({ children, handleClick }) => {
  const [isHover, setIsHover] = useState(false)
  return <div style={{ filter: isHover ? "brightness(80%)" : "brightness(100%)" }} onClick={() => handleClick()}
    onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
    {children}
  </div>
}

export default Hoverable