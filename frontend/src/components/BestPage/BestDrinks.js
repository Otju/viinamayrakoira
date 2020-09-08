import React from 'react'
import { useQuery } from '@apollo/client'
import { BEST_DRINKS } from '../../queries'
import Spinner from 'react-bootstrap/Spinner'
import DrinkCardList from '../DrinkCardList'
import { colors } from '../../utils'

const BestDrinks = ({ store, displayName }) => {
  const result = useQuery(BEST_DRINKS, { variables: { store } })

  if (!result.data || result.loading) {
    return <Spinner animation="border" />
  }

  let drinks = result.data.bestDrinks

  drinks = drinks.map((drink, i) => {
    let sticker
    if (i === 0) {
      sticker = "Halvin känni"
    }
    if (i === 1) {
      sticker = "Halvin juoma"
    }
    if (i === 2) {
      sticker = "Halvin litrahinta"
    }
    return { ...drink, sticker }
  })

  return <div style={{ width: "90%", margin: "auto", border: "solid", borderColor: colors.lightGray, padding: "1rem", marginBottom: "2rem" }}>
    <h3>{displayName}</h3>
    <DrinkCardList drinks={drinks} />
  </div>
}


export default BestDrinks