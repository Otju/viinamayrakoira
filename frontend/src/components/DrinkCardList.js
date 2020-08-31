import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from '../queries'
import DrinkCard from './DrinkCard'
import { CardGroup, Spinner } from 'react-bootstrap'
import PaginationMenu from './PaginationMenu'
import { useWindowDimensions, groupByN } from '../utils'

const DrinkCardList = ({ searchVariables }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { width } = useWindowDimensions()

  useEffect(() => {
    setCurrentPage(1)
  }, [searchVariables])

  const drinksPerPage = 30
  const offset = drinksPerPage * (currentPage - 1)
  const searchVariablesWithMinMaxFix = {}
  Object.entries(searchVariables).forEach(([key, value]) => {
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

  let groupSize = width >= 1080 ? 3 : 2
  if (width < 600) {
    groupSize = 1
  }

  const groupedDrinks = groupByN(drinks, groupSize)

  return <div>
    {
      groupedDrinks.map(group => <CardGroup key={group[0].id}>
        {group.map((drink, i) => (
          <DrinkCard style={{ display: 'inline-block' }} key={drink.id} drink={drink} position={i + 1} hasRightMargin={groupSize === 3} />
        ))}
      </CardGroup>)
    }
    <PaginationMenu {...{ currentPage, drinksPerPage, setCurrentPage, count }}></PaginationMenu>
  </div>
}

export default DrinkCardList