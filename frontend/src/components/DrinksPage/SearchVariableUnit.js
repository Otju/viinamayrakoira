import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { ALL_DRINKS } from "../../queries"
import SearchVariableMenu from "./SearchVariableMenu"
import { searchTypes } from "../../utils"
import { useLocation, useHistory } from "react-router-dom"
import _ from "lodash"


const SearchVariableUnit = ({ setDrinks, offset, setOffset, isChunked, dontSearchEmpty, expandable, drinksPerPage }) => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const history = useHistory()

  const initialMinMax = {}
  searchTypes.forEach(item => {
    initialMinMax[`min${item.name}`] = ""
    initialMinMax[`max${item.name}`] = ""
  })

  const emptySearchVariables = { name: "", sortByField: "pricePerPortion", store: [], category: [], sortByDescending: false, ...initialMinMax }

  const getQueryStrings = () => {

    const queryStrings = {}

    Object.keys(emptySearchVariables).forEach(key => {

      const originalValue = emptySearchVariables[key]

      if (Array.isArray(originalValue)) {
        if (query.get(key)) {
          queryStrings[key] = [...originalValue, ...query.get(key).split(",")]
        } else {
          queryStrings[key] = []
        }
      } else if (key === "sortByDescending") {
        queryStrings[key] = query.get(key) === "true"
      }
      else {
        queryStrings[key] = query.get(key) ?? originalValue
      }
    })
    return queryStrings
  }

  useEffect(() => {
    setSearchVariablesState(getQueryStrings())
    // eslint-disable-next-line
  }, [location])


  const [searchVariables, setSearchVariablesState] = useState(getQueryStrings())

  const setSearchVariables = (variables) => {
    setSearchVariablesState(variables)
    let queryStrings = "?"
    Object.keys(variables).forEach(key => {
      const value = variables[key]
      if (value && (value.length > 0 || typeof value === "number" || typeof value === "boolean") && value !== "pricePerPortion") {
        if (Array.isArray(value)) {
          queryStrings += `&${key}=`
          value.forEach((individualValue, i) => queryStrings += i > 0 ? `,${individualValue}` : individualValue)
        } else {
          queryStrings += (`&${key}=${value}`)
        }
      }
    })
    history.push(`${window.location.pathname}${queryStrings}`)
  }

  drinksPerPage = drinksPerPage || 30
  const searchVariablesWithMinMaxFix = {}
  Object.entries(searchVariables).forEach(([key, value]) => {
    if (key.includes("min") || key.includes("max")) {
      const valueAsNumber = Number(value)
      if (valueAsNumber > 0) {
        const name = key.slice(3)
        const minOrMax = key.slice(0, 3)
        let minMaxObject
        if (!searchVariablesWithMinMaxFix.minMax) {
          searchVariablesWithMinMaxFix.minMax = []
        }
        minMaxObject = searchVariablesWithMinMaxFix.minMax.find(item => item.name === name)
        if (minMaxObject) {
          minMaxObject[minOrMax] = valueAsNumber
          searchVariablesWithMinMaxFix.minMax.map(item => item.name !== name ? item : minMaxObject)
        } else {
          minMaxObject = { name }
          minMaxObject[minOrMax] = valueAsNumber
          searchVariablesWithMinMaxFix.minMax.push(minMaxObject)
        }
      }
    } else {
      searchVariablesWithMinMaxFix[key] = value
    }
  })

  const hasSearch = Boolean(!_.isEqual(searchVariables, emptySearchVariables))

  const result = useQuery(ALL_DRINKS, { variables: { first: drinksPerPage, offset, ...searchVariablesWithMinMaxFix }, skip: (!hasSearch && dontSearchEmpty) })

  const dataIsLoading = !result || !result.data || result.loading

  useEffect(() => {
    setOffset(0)
    if (!dataIsLoading) {
      setDrinks(isChunked ? [result.data.allDrinks] : result.data.allDrinks)
    } else {
      setDrinks(null)
    }
    // eslint-disable-next-line
  }, [searchVariables])

  useEffect(() => {
    if (!dataIsLoading) {
      if (isChunked) {
        setDrinks(d => d ? [...d, result.data.allDrinks] : [result.data.allDrinks])
      } else {
        setDrinks(d => d ? d.concat(result.data.allDrinks) : result.data.allDrinks)
      }
    }
    // eslint-disable-next-line
  }, [result])


  return <SearchVariableMenu expandable={expandable} searchVariables={searchVariables} setSearchVariables={setSearchVariables} emptySearchVariables={emptySearchVariables} />
}

export default SearchVariableUnit