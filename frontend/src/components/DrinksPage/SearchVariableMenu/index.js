import React from 'react'
import SearchVariableButton from './SearchVariableButton'
import Form from 'react-bootstrap/Form'
import MinMaxDropDown from './MinMaxDropDown'
import SortBySettings from './SortBySettings'
import CheckboxDropDown from './CheckboxDropDown'
import { categories, stores, colors, searchTypes } from '../../../utils'

const SearchVariableMenu = ({ searchVariables, setSearchVariables }) => {

  const setFieldValue = (searchCategory, value) => {
    setSearchVariables({ ...searchVariables, [searchCategory]: value })
  }

  /*
  <MinMaxDropDown searchVariables={searchVariables} valuetypes={searchTypes}></MinMaxDropDown>
  */

  return <div style={{ border: "solid", color: colors.darkGray, padding: "1rem" }}>
    <Form>
      <Form.Group>
        <Form.Control type="text" placeholder="Haku" value={searchVariables.name} onChange={() => setFieldValue("name",this.state.value)}/>
      </Form.Group>
      <CheckboxDropDown values={stores} name={"store"} displayName={"kauppa"} {...{ setFieldValue, searchVariables }} />
      <CheckboxDropDown values={categories} name={"category"} displayName={"kategoria"} {...{ setFieldValue, searchVariables }} />
      <SortBySettings setFieldValue={setFieldValue} searchVariables={searchVariables} valuetypes={searchTypes} ></SortBySettings>
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