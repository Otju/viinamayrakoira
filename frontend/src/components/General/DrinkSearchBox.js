import React, { useState } from "react"
import { capitalizeFirst } from "../../utils"
import ListGroup from 'react-bootstrap/ListGroup'
import Hoverable from "./Hoverable"
import InfiniteScroll from 'react-infinite-scroll-component'
import SearchVariableUnit from '../DrinksPage/SearchVariableUnit'
import { useHistory } from "react-router-dom"

const DrinkSearchBox = ({ handleClick, keyPart }) => {

  const [offset, setOffset] = useState(0)
  const [drinks, setDrinks] = useState([])
  const history = useHistory()

  let content
  if (drinks && drinks.length !== 0) {
    const uniqueIds = [...(new Set(drinks.map(d => d.id)))]
    const uniqueDrinks = uniqueIds.map(id => drinks.find(drink => drink.id === id)) //Very bad solution
    content =
      <ListGroup>
        <InfiniteScroll
          dataLength={uniqueDrinks.length}
          next={() => setOffset(offset + 10)}
          hasMore={true}
          scrollableTarget="scrollDiv"
        >
          {uniqueDrinks.map((drink, i) => {
            //const storeColor = stores.find(store => drink.store === store.name).color style={{ border: "solid", borderColor: storeColor, border }}
            return (
              <Hoverable link={handleClick ? null : `drinks/${drink.id}`} handleClick={() => { history.push(); handleClick(drink); setOffset(0) }} key={drink.id + keyPart}>
                <ListGroup.Item>
                  <div style={{ width: "40%", display: "inline-block" }}>
                    <img src={drink.imageLink} alt={drink.name} style={{ maxHeight: "6rem", mixBlendMode: "multiply", marginLeft: "auto", marginRight: "auto", display: "block" }} />
                  </div>
                  <div style={{ display: "inline-block", width: "60%" }}>
                    <div style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{drink.name}</div>
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
    <SearchVariableUnit offset={offset} setOffset={setOffset} setDrinks={setDrinks} dontSearchEmpty={true} drinksPerPage={10} expandable={true} />
    {content}
  </div>
}

export default DrinkSearchBox