import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { capitalizeFirst } from '../utils'
import Button from 'react-bootstrap/Button'

const SearchVariableMenu = ({ searchVariables, setSearchVariables }) => {

  const stores = ["alko", "foodie", "superAlko"]

  const categories = ["Punaviinit",
    "Roseeviinit",
    "Valkoviinit",
    "Kuohuviinit ja Samppanjat",
    "Muut viinit",
    "Hanapakkaukset",
    "Oluet",
    "Siiderit",
    "Juomasekoitukset ja lonkerot",
    "Vodkat ja Viinat",
    "Ginit ja muut viinat",
    "Rommit",
    "Konjakit",
    "Brandyt, Armanjakit ja Calvadosit",
    "Viskit",
    "Liköörit ja Katkerot",
    "Alkoholittomat"
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
          {createCheckboxesFromArray(stores,"stores")}
          {createCheckboxesFromArray(categories,"category")}
          < Button type="submit" variant="dark">Search</Button>
        </Form>
      )}
    </Formik>
  </div>
}

export default SearchVariableMenu