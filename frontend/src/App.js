import React from 'react'
import BestPage from './components/BestPage'
import NavigationBar from './components/NavigationBar'
import StatisticsPage from './components/StatisticsPage/'
import { Switch, Route, Redirect } from "react-router-dom"
import DrinksPage from './components/DrinksPage'


const App = () => {


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
          <DrinksPage/>
        </Route>
        <Route path="/">
          <Redirect to="/best" />
        </Route>
      </Switch>
    </div>
  )
}

export default App
