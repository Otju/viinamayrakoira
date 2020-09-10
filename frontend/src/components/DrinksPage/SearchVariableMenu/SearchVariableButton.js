import React from 'react'
import Alert from 'react-bootstrap/Alert'
import { capitalizeFirst, searchTypes } from '../../../utils'

const SearchVariableButton = ({ setFieldValue, searchCategory, value, searchVariables, setSearchVariables }) => {

  const handleSearchVariableDeletion = (searchCategory, valueToDelete, setFieldValue) => {
    const newSearchVariables = { ...searchVariables }
    if (Array.isArray(newSearchVariables[searchCategory])) {
      newSearchVariables[searchCategory] = newSearchVariables[searchCategory].filter(value => value !== valueToDelete)
      setFieldValue(searchCategory, newSearchVariables[searchCategory])
    } else {
      setFieldValue(searchCategory, "")
    }
  }

  if (searchCategory === "sortByField" || searchCategory === "sortByDescending") {
    return null
  }

  let insidevalue = capitalizeFirst(value)
  if (typeof value !== "string") {
    const unit = searchTypes.find(type => type.name === searchCategory.slice(3)).unit
    let minxOrMax = "max"
    if (searchCategory.includes("min")) {
      minxOrMax = "min"
    }
    insidevalue = `${minxOrMax} ${value}${unit}`
  }

  return <Alert style={{ display: "inline-block", width: "fit-content", marginTop: "0.5rem", marginRight: "0.5rem" }} variant="danger"
    onClose={() => handleSearchVariableDeletion(searchCategory, value, setFieldValue)} dismissible>
    {insidevalue}
  </Alert>

}


export default SearchVariableButton