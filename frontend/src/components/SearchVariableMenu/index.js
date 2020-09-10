import React from 'react'
import { Formik, Form, Field } from 'formik'
import SearchVariableButton from './SearchVariableButton'
import MinMaxDropDown from './MinMaxDropDown'
import SortBySettings from './SortBySettings'
import CheckboxDropDown from './CheckboxDropDown'
import { categories, stores, searchTypes } from '../../utils'

const SearchVariableMenu = ({ searchVariables, setSearchVariables }) => {

  const initialMinMax = {}
  searchTypes.forEach(item => {
    initialMinMax[`min${item.name}`] = ""
    initialMinMax[`max${item.name}`] = ""
  })

  return <div style={{ border: "solid", padding: "1rem" }}>
    <Formik
      initialValues={{ name: "", sortByField: "pricePerPortion", store: [], category: [], falsesortByDescending: false, ...initialMinMax }}
      validate={values => {
        const errors = {}
        return errors
      }}

      onSubmit={(values) => {
        setSearchVariables(values)
      }}
    >
      {({ handleSubmit, setFieldValue }) => (
        <Form className="form-group">
          <Field type="text" name="name" placeholder="haku nimellä" className="form-control" onBlur={() => handleSubmit()} />
          <CheckboxDropDown values={stores} name={"store"} displayName={"kauppa"} {...{ setFieldValue, handleSubmit, searchVariables }} />
          <CheckboxDropDown values={categories} name={"category"} displayName={"kategoria"} {...{ setFieldValue, handleSubmit, searchVariables }} />
          <MinMaxDropDown searchVariables={searchVariables} valuetypes={searchTypes} handleSubmit={handleSubmit}></MinMaxDropDown>
          <SortBySettings setFieldValue={setFieldValue} searchVariables={searchVariables} handleSubmit={handleSubmit} valuetypes={searchTypes} ></SortBySettings>
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
      )}
    </Formik>
  </div >
}

export default SearchVariableMenu