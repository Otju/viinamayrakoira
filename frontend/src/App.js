import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from './queries'
import DrinkCard from './components/DrinkCard'
import CardGroup from 'react-bootstrap/CardGroup'


function App() {
  const result = useQuery(ALL_DRINKS)
  if (!result.data || result.loading) {
    return null
  }
  const drinks = result.data.allDrinks


  const groupByN = (data, n) => {
    let result = []
    for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n))
    return result;
  }

  const groupedDrinks = groupByN(drinks.slice(12000, drinks.length).map((drink, i) => (
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

export default App
