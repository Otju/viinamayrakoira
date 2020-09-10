import React, { useState, useEffect } from 'react'
import SearchVariableButton from './SearchVariableButton'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import MinMaxDropDown from './MinMaxDropDown'
import SortBySettings from './SortBySettings'
import CheckboxDropDown from './CheckboxDropDown'
import { categories, stores, colors, searchTypes } from '../../../utils'
import _ from 'lodash'

const SearchVariableMenu = ({ searchVariables, setSearchVariables, initialSearchVariables }) => {

  const [name, setName] = useState("")

  const setFieldValue = (searchCategory, value) => {
    setSearchVariables({ ...searchVariables, [searchCategory]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFieldValue("name", name)
  }

  useEffect(() => {
    setName(searchVariables.name)
  }, [searchVariables])

  return <div style={{ border: "solid", color: colors.darkGray, padding: "1rem" }}>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control type="text" placeholder="Haku" value={name} onChange={(event) => setName(event.target.value)} />
      </Form.Group>
      <CheckboxDropDown values={stores} name={"store"} displayName={"kauppa"} {...{ setFieldValue, searchVariables }} />
      <CheckboxDropDown values={categories} name={"category"} displayName={"kategoria"} {...{ setFieldValue, searchVariables }} />
      <MinMaxDropDown searchVariables={searchVariables} valuetypes={searchTypes} setFieldValue={setFieldValue}></MinMaxDropDown>
      <SortBySettings setFieldValue={setFieldValue} searchVariables={searchVariables} valuetypes={searchTypes} ></SortBySettings>

      {!_.isEqual(searchVariables, initialSearchVariables) ?
        <Button variant="danger" onClick={() => setSearchVariables(initialSearchVariables)}>nollaa haku</Button> : null
      }
      <div>
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
    </Form>
  </div>
}

export default SearchVariableMenu