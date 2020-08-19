import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from '../queries'
import DrinkCard from './DrinkCard'
import { CardGroup } from 'react-bootstrap'
import PaginationMenu from './PaginationMenu'

const DrinkCardList = ({ searchVariables }) => {

  const [currentPage, setCurrentPage] = useState(1)
  const drinksPerPage = 30
  const offset = drinksPerPage * (currentPage - 1)

  const result = useQuery(ALL_DRINKS, { variables: { first: drinksPerPage, offset, ...searchVariables } })
  if (!result.data || result.loading) {
    return "loading..."
  }
  const drinks = result.data.allDrinks.drinks
  const count = result.data.allDrinks.count

  if(count===0){
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