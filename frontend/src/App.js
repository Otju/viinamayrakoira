import React, { useState } from "react"
import BestPage from "./components/BestPage"
import NavigationBar from "./components/NavigationBar"
import StatisticsPage from "./components/StatisticsPage/"
import AdminPage from "./components/AdminPage"
import { Switch, Route, Redirect } from "react-router-dom"
import DrinksPage from "./components/DrinksPage"
import PortionCalculatorPage from "./components/PortionCalculatorPage"
import InfoPage from "./components/InfoPage"
import SingleDrinkPage from "./components/SingleDrinkPage"
import ComparisonPage from "./components/ComparisonPage"
import { stores } from "./utils"
import Footer from "./components/Footer"
import Alert from "react-bootstrap/Alert"


const App = () => {

  const [hasVisited, setHasVisited] = useState(localStorage.getItem("viinamayrakoira-has-visited") || localStorage.getItem("viinamayrakoira-user-token"))

  if (process.env.REACT_APP_MAINTANANCE) {
    return <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%", alignItems: "center", height: "100%", textAlign: "center", marginTop: "10rem" }}>
      <div style={{ filter: "brightness(0%)", width: "100%" }}>
        <img src={process.env.PUBLIC_URL + "/doggo.svg"} style={{ height: "10rem" }} alt="viinamayrakoira.svg" />
      </div>
      <p style={{ width: "100%" }}><h1>Viinamayrakoira.fi</h1></p>
      <p style={{ width: "100%" }}><h2>Pahoittelut, mutta sivu on hetken pois päältä huollon ajaksi :(</h2></p>
      <p style={{ width: "100%" }}><h3>Tule pian uudestaan!</h3></p>
    </div>
  }

  const storeStyles = stores.map(store => (
    <style type="text/css" key={store.name}>
      {`
      .btn-${store.name} {
         background-color: ${store.color};
         color: ${store.textColor || "black"}
      }
   `}
    </style>
  ))

  const handleClose = () => {
    localStorage.setItem("viinamayrakoira-has-visited", true)
    setHasVisited(true)
  }

  return <>
    <NavigationBar></NavigationBar>
    <div style={{ background: "#ede8e8", minHeight: "90vh" }}>
      <div className="container">
        {storeStyles}
        <Alert variant="dark" show={!hasVisited} dismissible onClose={() => handleClose()}>
          <Alert.Heading>Tervetuloa!</Alert.Heading>
          <p>Tältä nettisivulta löydät kaikki alkoholijuomat Alkon, S-ryhmän, K-marketin, Eckerö Linen,
          Tallink & Silja Linen ja Superalkon (Viro ja Latvia) nettisivuilta</p>
          <p><i>Parhaat</i>-sivulta löydät parhaat juomat annoshinnan ja arvostelujen perusteella,
          mutta kannattaa käydä <i>Juomat</i>-sivulla, jossa näät kaikki juomat
          ja voit helposti löytää sinulle sopivat käyttämällä monia hakuvaihtoehtoja</p>
          <b>Ja juothan vastuullisesti :)</b>
        </Alert>
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
          <Route path="/admin">
            <AdminPage />
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
