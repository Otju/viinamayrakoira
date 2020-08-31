import React, { useState } from 'react'
import SearchVariableMenu from './components/SearchVariableMenu/'
import DrinkCardList from './components/DrinkCardList'
import NavigationBar from './components/NavigationBar'
import { Switch, Route, Link, } from "react-router-dom"


const App = () => {

  const [searchVariables, setSearchVariables] = useState({ name: "" })

  return (
    <div className="container" style={{ background: "#ede8e8" }}>
      <NavigationBar></NavigationBar>
      <Switch>
        <Route path="/">
          <SearchVariableMenu searchVariables={searchVariables} setSearchVariables={setSearchVariables} />
          <DrinkCardList searchVariables={searchVariables} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
