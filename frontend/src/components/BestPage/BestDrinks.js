import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from '../../queries'
import Spinner from 'react-bootstrap/Spinner'
import DrinkCardList from '../DrinkCardList'
import { colors } from '../../utils'

const BestDrinks = ({ store, displayName }) => {
  const result = useQuery(ALL_DRINKS, { variables: { first: 3, store } })

  if (!result.data || result.loading) {
    return <Spinner animation="border" />
  }

  const drinks = result.data.allDrinks.drinks

  return <div style={{ width: "90%", margin: "auto", border: "solid", borderColor: colors.lightGray, padding: "1rem", marginBottom: "2rem" }}>
    <h3>{displayName}</h3>
    <DrinkCardList drinks={drinks} />
  </div>
}


export default BestDrinks