import React from "react"
import BestDrinks from "./BestDrinks"
import { stores } from "../../utils"

const BestPage = () => {

  return <div>
    <h1>Parhaat juomat</h1>
    <BestDrinks key="overall" displayName="Kaikki kaupat"></BestDrinks>
    {stores.map(store => <BestDrinks key={store.name} store={store.name} displayName={store.displayName}/>)}
  </div>
}


export default BestPage