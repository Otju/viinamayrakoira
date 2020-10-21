import React from 'react'
import { useQuery } from '@apollo/client'
import { BEST_DRINKS } from '../../queries'
import Spinner from 'react-bootstrap/Spinner'
import DrinkCardList from '../General/DrinkCards/DrinkCardList'
import { colors } from '../../utils'

const BestDrinks = ({ store, displayName }) => {
  const result = useQuery(BEST_DRINKS, { variables: { store } })

  if (!result.data || result.loading) {
    return <Spinner animation="border" />
  }

  store = store ?? "all"

  let drinks = result.data.bestDrinks

  drinks = drinks.map((drink, i) => {
    let sticker
    if (i === 0) {
      sticker = "Halvin känni"
    }
    if (i === 1) {
      sticker = "Paras maku"
    }
    if (i === 2) {
      sticker = "Paras hinta-laatu"
    }
    return { ...drink, sticker, allStores: store !== "all" ? false : true }
  })

  return <div style={{ margin: "auto", border: "solid", borderColor: colors.lightGray, padding: "1rem", marginBottom: "2rem" }}>
    <h3>{displayName}</h3>
    <DrinkCardList drinks={drinks} bestDrinksStore={store} />
  </div>
}


export default BestDrinks