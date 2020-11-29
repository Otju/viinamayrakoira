import React from "react"
import SearchVariableButton from "./SearchVariableButton"


const SearchVariableButtons = ({ mobile, setFieldValue, searchVariables, setSearchVariables }) => {

  if (mobile) {
    return null
  }

  return <div>
    {Object.entries(searchVariables).map(([key, values]) => {
      if (values) {
        values = !Array.isArray(values) ? [values] : values
        if (values.length > 0) {
          return values.map(value => <SearchVariableButton searchCategory={key}
            setFieldValue={setFieldValue}
            searchVariables={searchVariables}
            setSearchVariables={setSearchVariables}
            key={value} value={value} />)
        }
      }
      return null
    })}
  </div>
}

export default SearchVariableButtons