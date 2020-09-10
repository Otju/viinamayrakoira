import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from '../../queries'
import Spinner from 'react-bootstrap/Spinner'
import PaginationMenu from './PaginationMenu'
import DrinkCardList from "../DrinkCardList"
import SearchVariableMenu from './SearchVariableMenu'
import { searchTypes } from '../../utils'
import { useLocation, useHistory } from "react-router-dom"


const DrinksPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const query = new URLSearchParams(useLocation().search)
  const history = useHistory()

  const initialMinMax = {}
  searchTypes.forEach(item => {
    initialMinMax[`min${item.name}`] = ""
    initialMinMax[`max${item.name}`] = ""
  })

  const emptySearchVariables = { name: "", sortByField: "pricePerPortion", store: [], category: [], sortByDescending: false, ...initialMinMax }

  const searchVariablesFromQueryStrings = {}

  Object.keys(emptySearchVariables).forEach(key => {
    const originalValue = emptySearchVariables[key]

    if (Array.isArray(originalValue)) {
      if (query.get(key)) {
        searchVariablesFromQueryStrings[key] = [...originalValue, ...query.get(key).split(",")]
      }
    } else {
      searchVariablesFromQueryStrings[key] = query.get(key) ?? originalValue
    }
  })



  const [searchVariables, setSearchVariablesState] = useState(searchVariablesFromQueryStrings)

  const setSearchVariables = (variables) => {
    console.log(variables)
    setSearchVariablesState(variables)
    let queryStrings = "?"
    Object.keys(variables).forEach(key => {
      const value = variables[key]
      if (value && value.length>0 && value!== "pricePerPortion") {
        if (Array.isArray(value)) {
          queryStrings += `&${key}=`
          value.forEach((individualValue,i) => queryStrings += i>0 ? `,${individualValue}` : individualValue)
        } else {
          queryStrings += (`&${key}=${value}`)
        }
      }
    })
    console.log(queryStrings)
    history.push(`/drinks${queryStrings}`)
  }

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


  let content

  if (!result.data || result.loading) {
    content = <Spinner animation="border" />
  } else if (result.data.allDrinks.count === 0) {
    content = "Haulla ei löytynyt mitään"
  } else {
    content = <>
      <DrinkCardList drinks={result.data.allDrinks.drinks} />
      <PaginationMenu {...{ currentPage, drinksPerPage, setCurrentPage }} count={result.data.allDrinks.count} />
    </>
  }

  return <div>
    <SearchVariableMenu searchVariables={searchVariables} setSearchVariables={setSearchVariables} emptySearchVariables={emptySearchVariables} />
    {content}
  </div>
}

export default DrinksPage