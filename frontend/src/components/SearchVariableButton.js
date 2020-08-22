import React from 'react'
import Alert from 'react-bootstrap/Alert'
import { capitalizeFirst } from '../utils'

const SearchVariableButton = ({ setFieldValue, searchCategory, value, searchVariables, setSearchVariables }) => {

  const handleSearchVariableDeletion = (searchCategory, valueToDelete, setFieldValue) => {
    const newSearchVariables = { ...searchVariables }
    if (Array.isArray(newSearchVariables[searchCategory])) {
      newSearchVariables[searchCategory] = newSearchVariables[searchCategory].filter(value => value !== valueToDelete)
      if (newSearchVariables[searchCategory].length === 0) {
        delete newSearchVariables[searchCategory]
      }
      setFieldValue(searchCategory, newSearchVariables[searchCategory])
    } else {
      delete newSearchVariables[searchCategory]
      setFieldValue(searchCategory, "")
    }
    setSearchVariables(newSearchVariables)

  }

  return <Alert style={{ display: "inline-block", width: "fit-content", marginTop: "0.5rem", marginRight: "0.5rem" }} variant="danger" onClose={() => handleSearchVariableDeletion(searchCategory, value, setFieldValue)} dismissible>
    {capitalizeFirst(value)}
  </Alert>
}

export default SearchVariableButton