import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from '../queries'
import DrinkCard from './DrinkCard'
import { CardGroup, Spinner } from 'react-bootstrap'
import PaginationMenu from './PaginationMenu'

const DrinkCardList = ({ searchVariables }) => {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchVariables])

  const drinksPerPage = 30
  const offset = drinksPerPage * (currentPage - 1)
  const searchVariablesWithMinMaxFix = {}
  Object.entries(searchVariables).map(([key, value]) => {
    if (key.includes("min") || key.includes("max")) {
      if (typeof value === 'number') {
        const name = key.slice(3)
        const minOrMax = key.slice(0, 3)
        let minMaxObject
        if (!searchVariablesWithMinMaxFix.minMax) {
          searchVariablesWithMinMaxFix.minMax = []
        }
        minMaxObject = searchVariablesWithMinMaxFix.minMax.find(item => item.name === name)
        if (minMaxObject) {
          minMaxObject[minOrMax] = value
          searchVariablesWithMinMaxFix.minMax.map(item => item.name !== name ? item : minMaxObject)
        } else {
          minMaxObject = { name }
          minMaxObject[minOrMax] = value
          searchVariablesWithMinMaxFix.minMax.push(minMaxObject)
        }
      }
    } else {
      searchVariablesWithMinMaxFix[key] = value
    }
  })
  const result = useQuery(ALL_DRINKS, { variables: { first: drinksPerPage, offset, ...searchVariablesWithMinMaxFix } })
  if (!result.data || result.loading) {
    return <Spinner animation="border" />
  }
  const drinks = result.data.allDrinks.drinks
  const count = result.data.allDrinks.count

  if (count === 0) {
    return "no results"
  }

  const groupByN = (data, n) => {
    let result = []
    for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n))
    return result;
  }

  const groupedDrinks = groupByN(drinks.map((drink, i) => (
    <DrinkCard style={{ display: 'inline-block' }} key={drink.id} drink={drink}></DrinkCard>
  )), 3)

  return <div>
    {
      groupedDrinks.map(group => <CardGroup key={group[0].key}>{group}</CardGroup>)
    }
    <PaginationMenu {...{ currentPage, drinksPerPage, setCurrentPage, count }}></PaginationMenu>
  </div>
}

export default DrinkCardList