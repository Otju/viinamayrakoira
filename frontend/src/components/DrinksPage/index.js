import React, { useState } from "react"
import Spinner from "react-bootstrap/Spinner"
import DrinkCardList from "../General/DrinkCardList"
import InfiniteScroll from "react-infinite-scroll-component"
import SearchVariableUnit from "./SearchVariableUnit"


const DrinksPage = () => {
  const [offset, setOffset] = useState(0)
  const [drinkChunks, setDrinkChunks] = useState(null)

  let content

  if (!drinkChunks) {
    content = <Spinner animation="border" />
  } else if (drinkChunks[0].length === 0) {
    content = <h5>Haullasi ei löytynyt tuloksia</h5>
  }
  else {
    content = <>
      <InfiniteScroll
        dataLength={drinkChunks.length}
        next={() => setOffset(offset + 30)}
        hasMore={true}
      >
        {drinkChunks.map((chunk, i) => <DrinkCardList drinks={chunk} key={i} />)}
      </InfiniteScroll>
    </>
  }

  return <div>
    <SearchVariableUnit offset={offset} setOffset={setOffset} setDrinks={setDrinkChunks} isChunked={true} />
    {content}
  </div>
}

export default DrinksPage