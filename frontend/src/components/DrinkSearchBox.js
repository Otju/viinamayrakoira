import React, { useState } from "react"
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from '../queries'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'

const DrinkSearchBox = () => {

  const [name, setName] = useState("")

  const result = useQuery(ALL_DRINKS, { variables: { first: 10, name } })

  let content
  if (!name) {
    content = <>Laita haku</>
  } else if (!result.data || result.loading) {
    content = <Spinner animation="border" />
  } else if (result.data.allDrinks.count === 0) {
    content = <>"Haulla ei löytynyt mitään"</>
  } else {
    content =
      <ul>
        {result.data.allDrinks.drinks.map(drink => (
          <li key={drink.id}>
            {drink.name}
          </li>
        ))}
      </ul>
  }

  return <div>
    <Form.Control type="text" placeholder="Haku" value={name} onChange={(event) => setName(event.target.value)} />
    {content}
  </div>
}

export default DrinkSearchBox