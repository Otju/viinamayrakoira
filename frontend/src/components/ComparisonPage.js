import React, { useState } from "react"
import ComparisonDrinkCard from "./General/ComparisonDrinkCard"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const ComparisonPage = () => {

  const [drinks, setDrinks] = useState([null, null])

  return <div style={{paddingTop: "1rem"}}>
    <Container><Row>
      <Col lg={5} sm={12}><ComparisonDrinkCard index={0} drinks={drinks} setDrinks={setDrinks} /></Col>
      <Col lg={2} sm={12} style={{ display: "flex", alignItems: "center", textAlign: "center" }}>{drinks.length === 2 ? <h1 style={{ display: "block", width: "100%" }}>VS</h1> : null}</Col>
      <Col lg={5} sm={12}><ComparisonDrinkCard index={1} drinks={drinks} setDrinks={setDrinks} /></Col>
    </Row></Container>
  </div >
}

export default ComparisonPage