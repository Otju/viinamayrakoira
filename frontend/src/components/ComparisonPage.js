import React from 'react'
import { useLocation, useHistory } from "react-router-dom"

const ComparisonPage = () => {
  const location = useLocation()
  const drinkParam = new URLSearchParams(location.search).get("drinks")
  const drinkIds = drinkParam ? drinkParam.split(",") : null
  console.log(drinkIds)

  const history = useHistory()

  return <div>
    <h1>COMPRE</h1>
  </div>
}

export default ComparisonPage