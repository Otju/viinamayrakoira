import React, { useState } from 'react'
import SearchVariableMenu from './components/SearchVariableMenu'
import DrinkCardList from './components/DrinkCardList'

const App = () => {

  const [searchVariables, setSearchVariables] = useState({})

  return (
    <div className="container">
      <h1>Viinamayrakoira</h1>
      <SearchVariableMenu {...{ searchVariables, setSearchVariables }} />
      <DrinkCardList searchVariables={searchVariables} />
    </div>
  );
}

export default App
