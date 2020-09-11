import React, { useState } from "react"
import DrinkSearchBox from './DrinkSearchBox'
import DrinkCardList from './DrinkCardList'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const PortionCalculatorPage = () => {

  const [drink, setDrink] = useState()
  const [percentage, setPercentage] = useState(40)
  const [amount, setAmount] = useState(0.04)

  const handleClick = (drink) => {
    setDrink(drink)
    setAmount(drink.size)
    setPercentage(drink.percentage)
  }

  const portionAmount = Math.round(((amount * ((percentage) / (100))) / 0.015201419 + 0.00001) * 100) / 100


  let drinkPart
  if (drink) {
    drinkPart = <div style={{ width: "50%", display: "inline-block", verticalAlign: "top" }}>
      <DrinkCardList drinks={[drink]}></DrinkCardList>
    </div>
  }


  return <div>
    <DrinkSearchBox handleClick={handleClick} />
    <div style={{ width: "50%", display: "inline-block", verticalAlign: "top", marginTop: "1rem" }}>
      <label>
        {"prosentit "}
        <Form.Control type="number" min="0" max="100" step="0.1" style={{ display: "inline-block", width: "5rem" }} value={percentage} onChange={(event) => setPercentage(event.target.value)} />
        <div className="input-group-append" style={{ display: "inline-block" }}>
          <span className="input-group-text">{"%"}</span>
        </div>
      </label>
      <br />
      <label>
        {"määrä "}
        <Form.Control step="0.05" min="0" style={{ display: "inline-block", width: "5rem" }} type="number" placeholder="l" value={amount} onChange={(event) => setAmount(event.target.value)} />
        <div className="input-group-append" style={{ display: "inline-block" }}>
          <span className="input-group-text">{"l"}</span>
        </div>
      </label>
      <br />
      <b>{portionAmount} annosta</b>
      <br/>
      <Button>Shotti</Button>
      <Button>Tölkillinen</Button>
      <Button>Lasillinen</Button>
      <Button>Tuoppi</Button>
      <Button>Pint</Button>
      <Button>Viinilasi</Button>
    </div>
    {drinkPart}
  </div>
}

export default PortionCalculatorPage