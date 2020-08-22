import React from 'react'
import { Formik, Form, Field } from 'formik'
import { capitalizeFirst } from '../utils'
import SearchVariableButton from './SearchVariableButton'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'

const SearchVariableMenu = ({ searchVariables, setSearchVariables }) => {

  const stores = ["alko", "foodie", "superAlko"]

  const categories = ["punaviinit",
    "roseeviinit",
    "valkoviinit",
    "kuohuviinit ja samppanjat",
    "muut viinit",
    "oluet",
    "siiderit",
    "juomasekoitukset ja lonkerot",
    "Vodkat ja viinat",
    "ginit ja muut viinat",
    "rommit",
    "konjakit",
    "brandyt, armanjakit ja calvadosit",
    "viskit",
    "liköörit ja katkerot",
    "alkoholittomat"
  ]

  const createCheckboxesFromArray = (array, name) => (

    <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        {name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {array.map(item => (
          <Dropdown.ItemText key={item}>
            <label>
              <Field type="checkbox" name={name} value={item} className="form-check-input" />
              {capitalizeFirst(item)}
            </label>
          </Dropdown.ItemText>
        ))}
      </Dropdown.Menu>
    </Dropdown >
  )

  return <div style={{ border: "solid", padding: "1rem" }}>
    <Formik
      initialValues={{ name: "" }}
      validate={values => {
        const errors = {}
        /*
        if (!values.email) {
          errors.email = 'Required'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address'
        }
         */
        return errors
      }}

      onSubmit={(values) => {
        setSearchVariables(values)
      }}
    >
      {({ handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit} onBlur={handleSubmit} className="form-group">
          <Field type="text" name="name" placeholder="search by name" className="form-control" />
          {createCheckboxesFromArray(stores, "store")}
          {createCheckboxesFromArray(categories, "category")}
          <Button type="submit" variant="dark">Search</Button>
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
                return null
              }
            })}
          </div>
        </Form>
      )}
    </Formik>
  </div>
}

export default SearchVariableMenu