import React from "react"
import DrinkSearchBox from './DrinkSearchBox'

const PortionCalculatorPage = () => {

  const handleClick = (drink) => {
    console.log(drink)
  }

  return <div>
    <DrinkSearchBox handleClick={handleClick} />
  </div>
}

export default PortionCalculatorPage