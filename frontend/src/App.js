import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from './queries'
import DrinkCard from './components/DrinkCard'
import CardGroup from 'react-bootstrap/CardGroup'
import Pagination from 'react-bootstrap/Pagination'
//import Button from 'react-bootstrap/Button'


const App = () => {

  const [page, setPage] = useState(1)
  const drinksPerPage = 42
  const offset = drinksPerPage*(page-1)
  const result = useQuery(ALL_DRINKS, { variables: { first: drinksPerPage, offset } })
  if (!result.data || result.loading) {
    return null
  }
  const drinks = result.data.allDrinks.drinks
  const count = result.data.allDrinks.count

  const groupByN = (data, n) => {
    let result = []
    for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n))
    return result;
  }

  const groupedDrinks = groupByN(drinks.map((drink, i) => (
    <DrinkCard style={{ display: 'inline-block' }} key={drink.id} drink={drink}></DrinkCard>
  )), 3)

  return (
    <div className="container">
      <h1>Drinks</h1>
      {
        groupedDrinks.map(group => <CardGroup key={group[0].key}>{group}</CardGroup>)
      }
      
    </div>
  );
}
//<Pagination></Pagination>

export default App
