import React, { useState } from "react"
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from '../queries'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Hoverable from "./Hoverable"

const DrinkSearchBox = ({ handleClick }) => {

  const [name, setName] = useState("")

  const result = useQuery(ALL_DRINKS, { variables: { first: 5, name, sortByField: "relevance"} })

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
      </>
  }

  return <div style={{ maxHeight: "28rem", marginLeft: "auto", marginRight: "auto", border: "solid"}}>
    <Form.Control type="text" placeholder="Hae juomaa" value={name} onChange={(event) => setName(event.target.value)} />
    {content}
  </div>
}

export default DrinkSearchBox