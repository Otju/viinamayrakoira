import React, { useState } from "react"
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from '../queries'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Hoverable from "./Hoverable"

const DrinkSearchBox = ({ handleClick, sortByField }) => {

  const [name, setName] = useState("")

  const result = useQuery(ALL_DRINKS, { variables: { first: 50, name, sortByField} })

  let content
  if (!name) {
  } else if (!result.data || result.loading) {
    content = <Spinner animation="border" />
  } else if (result.data.allDrinks.count === 0) {
    content = <>"Haulla ei löytynyt mitään"</>
  } else {
    const count = result.data.allDrinks.count
    const drinks = result.data.allDrinks.drinks
    const drinksOver = count - drinks.length

    content =
      <>
        <ListGroup>
          {drinks.map((drink, i) => {
            return (
              <Hoverable link={handleClick ? null : `drinks/${drink.id}`} handleClick={() => { handleClick(drink); setName("") }} key={drink.id}>
                <ListGroup.Item >
                  <div style={{ width: "6rem", display: "inline-block" }}>
                    <img src={drink.imageLink} alt={drink.name} style={{ maxHeight: "4rem", mixBlendMode: "multiply", marginLeft: "auto", marginRight: "auto", display: "block" }} />
                  </div>
                  {drink.name}
                </ListGroup.Item>
              </Hoverable>
            )
          })}
        </ListGroup>
        { drinksOver > 0 ? <h5 style={{ textAlign: "center" }}>({drinksOver} lisää, tarkenna hakua)</h5> : null}
      </>
  }

  return <div style={{ maxHeight: "28rem", marginLeft: "auto", marginRight: "auto", border: "solid", overflowX: "auto" }}>
    <Form.Control type="text" placeholder="Haku" value={name} onChange={(event) => setName(event.target.value)} />
    {content}
  </div>
}

export default DrinkSearchBox