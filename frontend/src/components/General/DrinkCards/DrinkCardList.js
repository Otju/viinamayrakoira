import React from 'react'
import DrinkCard from './DrinkCard'
import CardGroup from 'react-bootstrap/CardGroup'
import { groupByN, useWindowDimensions, stores } from '../../../utils'

const DrinkCardList = ({ drinks, bestDrinksStore, refetch }) => {

  const { width } = useWindowDimensions()

  let groupSize = width >= 1080 ? 3 : 2
  if (width < 600) {
    groupSize = 1
  }

  let groupedDrinks = groupByN(drinks, groupSize)

  groupedDrinks = groupedDrinks.map(group => (
    group.map(drink => {
      const key = bestDrinksStore ? drink.id + drink.sticker + bestDrinksStore : drink.id
      return { ...drink, key }
    })
  ))

  return <div>
    {stores.map(store => (
      <style type="text/css" key={store.name}>
        {`
        .btn-${store.name} {
           background-color: ${store.color};
        }
     `}
      </style>
    ))}
    {
      groupedDrinks.map(group => <CardGroup key={group[0].key}>
        {group.map((drink, i) => {
          return <DrinkCard style={{ display: 'inline-block' }} key={drink.key}
            drink={drink} position={i + 1} hasRightMargin={groupSize === 3} refetch={refetch}/>
        })}
      </CardGroup>)
    }
  </div>
}

export default DrinkCardList