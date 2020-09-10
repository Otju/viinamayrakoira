import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from '../../queries'
import Spinner from 'react-bootstrap/Spinner'
import PaginationMenu from './PaginationMenu'
import DrinkCardList from "../DrinkCardList"
import SearchVariableMenu from './SearchVariableMenu'
import { searchTypes } from '../../utils'

const DrinksPage = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const initialMinMax = {}
  searchTypes.forEach(item => {
    initialMinMax[`min${item.name}`] = ""
    initialMinMax[`max${item.name}`] = ""
  })

  const [searchVariables, setSearchVariables] = useState({ name: "", sortByField: "pricePerPortion", store: [], category: [], falsesortByDescending: false, ...initialMinMax })

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

  return <div>
    <SearchVariableMenu searchVariables={searchVariables} setSearchVariables={setSearchVariables} />
    {count === 0 ? "Haulla ei löytynyt mitään" :
      <>
        <DrinkCardList drinks={drinks} />
        <PaginationMenu {...{ currentPage, drinksPerPage, setCurrentPage, count }} />
      </>
    }
  </div>
}

export default DrinksPage