import React, { useState } from 'react'
import SearchVariableMenu from './components/SearchVariableMenu/'
import DrinkCardList from './components/DrinkCardList'
import NavigationBar from './components/NavigationBar'

const App = () => {

  const [searchVariables, setSearchVariables] = useState({ name: "" })

  return (
    <div className="container">
      <NavigationBar></NavigationBar>
      <SearchVariableMenu searchVariables={searchVariables} setSearchVariables={setSearchVariables} />
      <DrinkCardList searchVariables={searchVariables} />
    </div>
  )
}

export default App
