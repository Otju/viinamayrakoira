import React, { useState } from "react"
import AddPortionDrink from './AddPortionDrink'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { round } from '../../utils'

const PortionCalculatorPage = () => {

  const [portionDrinks, setPortionDrinks] = useState([])

  const portions = round(portionDrinks.reduce((acc, cur) => acc + cur.portionAmount, 0))
  const price = round(portionDrinks.reduce((acc, cur) => acc + cur.price, 0))

  return (
    <div>
      <h2>{portions} annosta</h2>
      <h2>{price}€</h2>
      <AddPortionDrink setPortionDrinks={setPortionDrinks} portionDrinks={portionDrinks} />
      <h3>Juomat</h3>
      <Table responsive style={{ wordWrap: "break-word" }}>
        <tbody>
          {portionDrinks.map((drink, i) => (
            <tr key={drink.name + i}>
              <td>
                {drink.amount}<br />
                {drink.name}
              </td>
              <td><div style={{ width: "6rem", display: "inline-block" }}>
                <img src={drink.imageLink} alt={drink.name} style={{ maxHeight: "6rem", mixBlendMode: "multiply", marginLeft: "auto", marginRight: "auto", display: "block" }} />
              </div></td>
              <td>
                <b>{drink.portionAmount} annosta</b><br />
                {<b>{drink.price}€</b>}<br />
                <Button variant="danger" onClick={() => { setPortionDrinks(portionDrinks.filter((item, i2) => i2 !== i)) }}>Poista</Button>
              </td>
            </tr>
          ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default PortionCalculatorPage