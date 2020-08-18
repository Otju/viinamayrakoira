import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_DRINKS } from './queries'

function App() {
  const result = useQuery(ALL_DRINKS)
  console.log(result)
  if (!result.data || result.loading) {
    return null
  }
  const drinks = result.data.allDrinks

  console.log(drinks)
  return (
    <div className="container">
      <h1>Drinks</h1>
        {
          drinks.map(drink => (
            <li key={drink.id}>{drink.name}</li>
          ))
        }
    </div>
  );
}

export default App
