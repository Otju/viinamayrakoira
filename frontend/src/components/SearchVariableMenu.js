import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { capitalizeFirst } from '../utils'
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
          <Dropdown.ItemText>
            <label key={item}>
              <Field type="checkbox" name={name} value={item} />
              {capitalizeFirst(item)}
            </label>
          </Dropdown.ItemText>
        ))}
      </Dropdown.Menu>
    </Dropdown >
  )

  return <div style={{ border: "solid", padding: "1rem" }}>
    <Formik
      initialValues={{ name: '' }}
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
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Field type="text" name="name" placeholder="search by name" />
          {createCheckboxesFromArray(stores, "store")}
          {createCheckboxesFromArray(categories, "category")}
          < Button type="submit" variant="dark">Search</Button>
        </Form>
      )}
    </Formik>
  </div>
}

export default SearchVariableMenu