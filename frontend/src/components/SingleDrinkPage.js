import React from 'react'
import { useParams } from "react-router-dom"

const SingleDrinkPage = () => {
  const { id } = useParams()


  return <div>
    <h1>Drink page for {id}</h1>
    </div>
}

export default SingleDrinkPage