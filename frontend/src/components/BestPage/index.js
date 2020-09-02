import React from 'react'
import BestDrinks from './BestDrinks'
import { stores } from '../../utils'

const BestPage = () => {

  return <div>
    <h1>Top 3 juomaa kaupoittain (annoshinnan mukaan)</h1>
    {stores.map(store => <BestDrinks key={store.name} store={store.name} displayName={store.displayName}/>)}
  </div>
}


export default BestPage