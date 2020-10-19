import React from 'react'
import { useParams } from "react-router-dom"
import { ONE_DRINK } from '../queries'
import { useQuery } from '@apollo/client'
import DrinkModal from './General/DrinkCards/DrinkModal'


const SingleDrinkPage = () => {

  const { id } = useParams()

  const result = useQuery(ONE_DRINK, { variables: { id } })

  let drink
  if (!id || !result || result.loading) {
    return null
  }
  console.log(result)
  drink = result.data.oneDrink

  return <DrinkModal show={true} drink={drink} standalone={true} />
}

export default SingleDrinkPage