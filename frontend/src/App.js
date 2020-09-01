import React, { useState } from 'react'
import SearchVariableMenu from './components/SearchVariableMenu/'
import BestPage from './components/BestPage'
import DrinkCardList from './components/DrinkCardList'
import NavigationBar from './components/NavigationBar'
import StatisticsPage from './components/StatisticsPage/'
import { Switch, Route, Redirect } from "react-router-dom"


const App = () => {

  const [searchVariables, setSearchVariables] = useState({ name: "" })

  return (
    <div className="container" style={{ background: "#ede8e8" }}>
      <NavigationBar></NavigationBar>
      <Switch>
        <Route path="/best">
          <BestPage/>
        </Route>
        <Route path="/statistics">
          <StatisticsPage />
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
          <Redirect to="/best" />
        </Route>
      </Switch>
    </div>
  )
}

export default App
