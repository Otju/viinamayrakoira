import React, { useState, useEffect } from "react"
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from '../../queries'
import { capitalizeFirst } from "../../utils"
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Hoverable from "./Hoverable"
import InfiniteScroll from 'react-infinite-scroll-component'


const DrinkSearchBox = ({ handleClick, defaultText }) => {

  const [name, setName] = useState(defaultText || "")
  const [offset, setOffset] = useState(0)
  const [drinks, setDrinks] = useState([])

  const result = useQuery(ALL_DRINKS, { variables: { first: 10, offset, name, sortByField: "pricePerPortion" } })

  const dataIsLoading = !result.data || result.loading

  useEffect(() => {
    setOffset(0)
    if (!dataIsLoading) {
      setDrinks(result.data.allDrinks)
    } else {
      setDrinks(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

  useEffect(() => {
    if (!dataIsLoading) {
      setDrinks(d => d ? [...d, ...result.data.allDrinks] : result.data.allDrinks)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  let content
  if (!name) {
  } else if (!drinks || drinks.length === 0) {
    if (dataIsLoading) {
      content = <Spinner animation="border" />
    } else {
      content = <>"Haulla ei löytynyt mitään"</>
    }
  } else {
    content =
      <ListGroup>
        <InfiniteScroll
          dataLength={drinks.length}
          next={() => setOffset(offset + 10)}
          hasMore={true}
          scrollableTarget="scrollDiv"
          >
          {drinks.map((drink, i) => {
            //const storeColor = stores.find(store => drink.store === store.name).color style={{ border: "solid", borderColor: storeColor, border }}
            return (
              <Hoverable link={handleClick ? null : `drinks/${drink.id}`} handleClick={() => { handleClick(drink); setName("") }} key={drink.id}>
                <ListGroup.Item>
                  <div style={{ width: "40%", display: "inline-block" }}>
                    <img src={drink.imageLink} alt={drink.name} style={{ maxHeight: "6rem", mixBlendMode: "multiply", marginLeft: "auto", marginRight: "auto", display: "block" }} />
                  </div>
                  <div style={{ display: "inline-block", width: "60%" }}>
                    <div style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"}}>{drink.name}</div>
                    {drink.price}€<br />
                    {drink.size}l<br />
                    {capitalizeFirst(drink.store)}
                  </div>
                </ListGroup.Item>
              </Hoverable>
            )
          })}
        </InfiniteScroll >
      </ListGroup >
  }

  return <div id="scrollDiv" style={{ marginLeft: "auto", marginRight: "auto", border: "solid", maxHeight: "28rem", overflowY: "scroll" }}>
    <Form.Control type="text" placeholder="Hae juomaa" value={name} onChange={(event) => setName(event.target.value)} />
    {content}
  </div>
}

export default DrinkSearchBox