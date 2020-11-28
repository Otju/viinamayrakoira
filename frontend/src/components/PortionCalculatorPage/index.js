import React, { useState } from "react"
import AddPortionDrink from "./AddPortionDrink"
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button"
import { round, useField} from "../../utils"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"

const PortionCalculatorPage = () => {


  const genderValues = [
    {
      metabolism: 0.015,
      bodyWater: 0.58,
      name: "Mies"
    },
    {
      metabolism: 0.017,
      bodyWater: 0.49,
      name: "Nainen"
    },
    {
      metabolism: 0.016,
      bodyWater: 0.535,
      name: "Muu"
    }
  ]


  const [portionDrinks, setPortionDrinks] = useState([])
  const [gender, setGender] = useState(genderValues[2])

  const weight = useField("number", "paino (kg)", null, null, { min: 20, max: 500 })
  const duration = useField("number", "Juomisen kesto (tunteina)")


  const portions = round(portionDrinks.reduce((acc, cur) => acc + cur.portionAmount, 0))
  const price = round(portionDrinks.reduce((acc, cur) => acc + cur.price, 0))

  const permilles = round(((0.806 * portions * 1.2) / (gender.bodyWater * weight.value) - duration.value * gender.metabolism) * 10)

  return (
    <div>
      <h2>{portions} annosta</h2>
      <h2>{(!permilles || permilles < 0 || !weight.value) ? 0 : permilles} promillea</h2>
      <h2>{price}€</h2>
      <AddPortionDrink setPortionDrinks={setPortionDrinks} portionDrinks={portionDrinks} />
      <div style={{padding: "1rem 0 1rem 0"}}>
        <h5>Promillejen laskeminen</h5>
        <i>Promillelaskurin tulokset ovat vain arvioita</i>
        <Form>
          {genderValues.map(genderItem =>
            <Form.Check
              type="radio"
              label={genderItem.name}
              name="gender"
              key={genderItem.name}
              inline
              onChange={() => setGender(genderItem)}
              checked={genderItem.name === gender.name}
            />
          )}
          <Form.Row>
            <Col lg="3">{weight.field}</Col>
          </Form.Row>
          <Form.Row>
            <Col lg="3">{duration.field}</Col>
          </Form.Row>
        </Form>
      </div>
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