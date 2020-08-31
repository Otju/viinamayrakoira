import React, { useState } from 'react'
import SearchVariableMenu from './components/SearchVariableMenu/'
import DrinkCardList from './components/DrinkCardList'
import NavigationBar from './components/NavigationBar'
import { Switch, Route,Redirect  } from "react-router-dom"


const App = () => {

  const [searchVariables, setSearchVariables] = useState({ name: "" })

  return (
    <div className="container" style={{ background: "#ede8e8" }}>
      <NavigationBar></NavigationBar>
      <Switch>
        <Route path="/statistics">
          <h1>Statistics</h1>
        </Route>
        <Route path="/bars">
          <h1>Baarit</h1>
        </Route>
        <Route path="/moreinfo">
          <h1>Lisää infoa</h1>
        </Route>
        <Route path="/drinks">
          <SearchVariableMenu searchVariables={searchVariables} setSearchVariables={setSearchVariables} />
          <DrinkCardList searchVariables={searchVariables} />
        </Route>
        <Route path="/">
          <Redirect to="/drinks"/>
        </Route>
      </Switch>
    </div>
  )
}

export default App
