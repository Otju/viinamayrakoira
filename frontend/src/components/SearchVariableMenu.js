import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { capitalizeFirst } from '../utils'
import Button from 'react-bootstrap/Button'

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
    "Vvodkat ja viinat",
    "ginit ja muut viinat",
    "rommit",
    "konjakit",
    "brandyt, armanjakit ja calvadosit",
    "viskit",
    "liköörit ja katkerot",
    "alkoholittomat"
    ]

  const createCheckboxesFromArray = (array, name) => array.map(item => (
    <label key={item}>
      <Field type="checkbox" name={name} value={item} />
      {capitalizeFirst(item)}
    </label>
  ))

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
          {createCheckboxesFromArray(stores,"store")}
          {createCheckboxesFromArray(categories,"category")}
          < Button type="submit" variant="dark">Search</Button>
        </Form>
      )}
    </Formik>
  </div>
}

export default SearchVariableMenu