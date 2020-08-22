import React from 'react'
import Alert from 'react-bootstrap/Alert'

const SearchVariableButton = ({ setFieldValue, searchCategory, value, searchVariables, setSearchVariables }) => {


  const handleSearchVariableDeletion = (searchCategory, valueToDelete, setFieldValue) => {
    const newSearchVariables = { ...searchVariables }
    if (Array.isArray(newSearchVariables[searchCategory])) {
      newSearchVariables[searchCategory] = newSearchVariables[searchCategory].filter(value => value !== valueToDelete)
      if (newSearchVariables[searchCategory].length === 0) {
        delete newSearchVariables[searchCategory]
      }
      setFieldValue(searchCategory, newSearchVariables[searchCategory])
    }else {
      delete newSearchVariables[searchCategory]
      setFieldValue(searchCategory, "")
    }
    setSearchVariables(newSearchVariables)
    
  }

  return <Alert style={{ width: "fit-content" }} variant="danger" onClose={() => handleSearchVariableDeletion(searchCategory, value, setFieldValue)} dismissible>
    {searchCategory}: {value}
  </Alert>
}

export default SearchVariableButton