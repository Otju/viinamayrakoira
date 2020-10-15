import React, { useState } from "react"
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from '../queries'
import { capitalizeFirst } from "../utils"
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Hoverable from "./Hoverable"

const DrinkSearchBox = ({ handleClick, defaultText }) => {

  const [name, setName] = useState(defaultText || "")

  const result = useQuery(ALL_DRINKS, { variables: { first: 50, name, sortByField: "pricePerPortion" } })

  let content
  if (!name) {
  } else if (!result.data || result.loading) {
    content = <Spinner animation="border" />
  } else if (result.data.allDrinks.length === 0) {
    content = <>"Haulla ei löytynyt mitään"</>
  } else {
    const drinks = result.data.allDrinks
    content =
      <>
        <ListGroup>
          {drinks.map((drink, i) => {
            //const storeColor = stores.find(store => drink.store === store.name).color style={{ border: "solid", borderColor: storeColor, border }}
            return (
              <Hoverable link={handleClick ? null : `drinks/${drink.id}`} handleClick={() => { handleClick(drink); setName("") }} key={drink.id}>
                <ListGroup.Item>
                  <div style={{ width: "8rem", display: "inline-block" }}>
                    <img src={drink.imageLink} alt={drink.name} style={{ maxHeight: "6rem", mixBlendMode: "multiply", marginLeft: "auto", marginRight: "auto", display: "block" }} />
                  </div>
                  <div style={{ display: "inline-block" }}>
                    {drink.name}<br />
                    {drink.price}€<br />
                    {drink.size}l<br />
                    {capitalizeFirst(drink.store)}
                  </div>
                </ListGroup.Item>
              </Hoverable>
            )
          })}
        </ListGroup>
      </>
  }

  return <div style={{ maxHeight: "28rem", marginLeft: "auto", marginRight: "auto", border: "solid", overflowY: "scroll" }}>
    <Form.Control type="text" placeholder="Hae juomaa" value={name} onChange={(event) => setName(event.target.value)} />
    {content}
  </div>
}

export default DrinkSearchBox