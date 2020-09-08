import React from 'react'
import DrinkCard from './DrinkCard'
import CardGroup from 'react-bootstrap/CardGroup'
import { groupByN, useWindowDimensions } from '../utils'

const DrinkCardList = ({ drinks }) => {

  const { width } = useWindowDimensions()

  let groupSize = width >= 1080 ? 3 : 2
  if (width < 600) {
    groupSize = 1
  }

  const groupedDrinks = groupByN(drinks, groupSize)

  return <div>
    {
      groupedDrinks.map(group => <CardGroup key={group[0].id}>
        {group.map((drink, i) => (
          <DrinkCard style={{ display: 'inline-block' }} key={drink.sticker ? drink.id + drink.sticker : drink.id} drink={drink} position={i + 1} hasRightMargin={groupSize === 3} />
        ))}
      </CardGroup>)
    }
  </div>
}

export default DrinkCardList