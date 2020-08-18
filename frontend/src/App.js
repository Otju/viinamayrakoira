import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from './queries'
import DrinkCard from './components/DrinkCard'
import CardGroup from 'react-bootstrap/CardGroup'
import Pagination from 'react-bootstrap/Pagination'
//import Button from 'react-bootstrap/Button'


const App = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const drinksPerPage = 30
  const offset = drinksPerPage * (currentPage - 1)
  const result = useQuery(ALL_DRINKS, { variables: { first: drinksPerPage, offset } })
  if (!result.data || result.loading) {
    return null
  }
  const drinks = result.data.allDrinks.drinks
  const count = result.data.allDrinks.count
  const maxPage = Math.ceil(count / drinksPerPage)

  const groupByN = (data, n) => {
    let result = []
    for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n))
    return result;
  }

  const groupedDrinks = groupByN(drinks.map((drink, i) => (
    <DrinkCard style={{ display: 'inline-block' }} key={drink.id} drink={drink}></DrinkCard>
  )), 3)

  let paginationTabs = [1, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, maxPage]

  paginationTabs = paginationTabs.filter(page => !(page < 1 || page > maxPage))

  paginationTabs = [...new Set(paginationTabs)]

  const paginationItems = paginationTabs.map((page, i) => {
    const prevPage = paginationTabs[i - 1]
    const nextPage = paginationTabs[i + 1]
    if (prevPage && nextPage && (page - prevPage > 1 || nextPage - page > 1)) {
      return <Pagination.Ellipsis key={page} />
    }

    return (
      <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
        {page}
      </Pagination.Item>
    )
  })


  return (
    <div className="container">
      <h1>Drinks</h1>
      {
        groupedDrinks.map(group => <CardGroup key={group[0].key}>{group}</CardGroup>)
      }
      <Pagination>
        <Pagination.First onClick={() => setCurrentPage(1)} />
        <Pagination.Prev onClick={() => { if (currentPage > 1) { setCurrentPage(currentPage - 1) } }} />
        {paginationItems}
        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
        <Pagination.Last onClick={() => { if (currentPage < maxPage) { setCurrentPage(maxPage + 1) } }} />
      </Pagination>
    </div>
  );
}

export default App
