import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from '../queries'
import Spinner from 'react-bootstrap/Spinner'

const BestPage = () => {
  const result = useQuery(ALL_DRINKS, { variables: { first: 3, store:"foodie"} })

  if (!result.data || result.loading) {
    return <Spinner animation="border" />
  }

  return <div>
    <h1>Bestpage</h1>
    {result.data.allDrinks.drinks.map(value => value.name)}
  </div>
}


export default BestPage