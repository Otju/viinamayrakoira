import React, { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import DrinkCardList from "../General/DrinkCards/DrinkCardList"
import InfiniteScroll from 'react-infinite-scroll-component'
import SearchVariableUnit from './SearchVariableUnit'


const DrinksPage = () => {
  const [offset, setOffset] = useState(0)
  const [drinkChunks, setDrinkChunks] = useState(null)

  let content

  if (!drinkChunks || drinkChunks[0].length === 0) {
    content = <Spinner animation="border" />
  } else {
    content = <>
      <InfiniteScroll
        dataLength={drinkChunks.length}
        next={() => setOffset(offset + 30)}
        hasMore={true}
      >
        {drinkChunks.map((chunk, i) => <DrinkCardList drinks={chunk} key={i} />)}
      </InfiniteScroll>
      <Spinner animation="border" />
    </>
  }

  return <div>
    <SearchVariableUnit offset={offset} setOffset={setOffset} setDrinks={setDrinkChunks} isChunked={true}/>
    {content}
  </div>
}

export default DrinksPage