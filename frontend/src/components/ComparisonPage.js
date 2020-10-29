import React, { useState } from 'react'
//import { useLocation, useHistory } from "react-router-dom"
import ComparisonDrinkCard from './General/DrinkCards/ComparisonDrinkCard'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const ComparisonPage = () => {
  //const location = useLocation()
  //const drinkParams = new URLSearchParams(location.search).get("drinks")
  //const drinkIds = drinkParams ? drinkParams.split(",") : [null, null]
  //const history = useHistory()

  const [drinks, setDrinks] = useState([null, null])

  /*
  useEffect(() => {
    if (drinks[0] !== null && drinks[1] !== null) {
      history.push(`/compare?drinks=${drinks.map(drink => drink ? drink.id : "undefined").join(",")}`)
    }
  }, [drinks])
  */

  return <div>
    <Container><Row>
      <Col lg={5} sm={12}><ComparisonDrinkCard index={0} drinks={drinks} setDrinks={setDrinks} /></Col>
      <Col lg={2} sm={12} style={{ display: "flex", alignItems: "center", textAlign: "center" }}>{drinks.length === 2 ? <h1 style={{ display: "block", width: "100%" }}>VS</h1> : null}</Col>
      <Col lg={5} sm={12}><ComparisonDrinkCard index={1} drinks={drinks} setDrinks={setDrinks} /></Col>
    </Row></Container>
  </div >
}

export default ComparisonPage