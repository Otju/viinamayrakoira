import React from "react"
import { useParams } from "react-router-dom"
import { ONE_DRINK } from "../queries"
import { useQuery } from "@apollo/client"
import SingleDrink from "./General/DrinkCards/SingleDrink"


const SingleDrinkPage = () => {

  const { id } = useParams()

  const result = useQuery(ONE_DRINK, { variables: { id } })

  let drink
  if (!id || !result || result.loading) {
    return null
  }
  drink = result.data.oneDrink

  return <div className="container" style={{ background: "white", paddingBottom: "2rem" }}>
    <h2>{drink.name}</h2>
    <SingleDrink drink={drink} />
  </div>
}

export default SingleDrinkPage