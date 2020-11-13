import React from "react"
import BestPage from "./components/BestPage"
import NavigationBar from "./components/NavigationBar"
import StatisticsPage from "./components/StatisticsPage/"
import { Switch, Route, Redirect } from "react-router-dom"
import DrinksPage from "./components/DrinksPage"
import PortionCalculatorPage from "./components/PortionCalculatorPage"
import InfoPage from "./components/InfoPage"
import SingleDrinkPage from "./components/SingleDrinkPage"
import ComparisonPage from "./components/ComparisonPage"
import { stores } from "./utils"
import Footer from "./components/Footer"


const App = () => {

  const storeStyles = stores.map(store => (
    <style type="text/css" key={store.name}>
      {`
      .btn-${store.name} {
         background-color: ${store.color};
      }
   `}
    </style>
  ))



  return <>
    <NavigationBar></NavigationBar>
    <div style={{ background: "#ede8e8", minHeight: "90vh"}}>
      <div className="container">
        {storeStyles}
        <Switch>
          <Route path="/best/:id?">
            <BestPage />
          </Route>
          <Route path="/statistics">
            <StatisticsPage />
          </Route>
          <Route path="/bars">
            <h1>Baarit</h1>
          </Route>
          <Route path="/moreinfo">
            <InfoPage />
          </Route>
          <Route path="/portioncalculator/:id?">
            <PortionCalculatorPage />
          </Route>
          <Route path="/drinks">
            <DrinksPage />
          </Route>
          <Route path="/drink/:id">
            <SingleDrinkPage />
          </Route>
          <Route path="/compare">
            <ComparisonPage />
          </Route>
          <Route path="/">
            <Redirect to="/best" />
          </Route>
        </Switch>
      </div>
    </div>
    <Footer />
  </>
}

export default App
