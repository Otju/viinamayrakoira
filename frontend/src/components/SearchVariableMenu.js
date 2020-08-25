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
    "vodkat ja viinat",
    "ginit ja muut viinat",
    "rommit",
    "konjakit",
    "brandyt, armanjakit ja calvadosit",
    "viskit",
    "liköörit ja katkerot",
    "alkoholittomat"
  ]

  const minMaxItems = [
    { name: "price", displayName: "hinta" },
    { name: "percentage", displayName: "vahvuus" },
    { name: "size", displayName: "tilavuus" },
    { name: "pricePerLitre", displayName: "litrahinta" },
    { name: "portionAmount", displayName: "annosmäärä" },
    { name: "pricePerPortion", displayName: "annoshinta" }
  ]

  const createCheckboxesFromArray = (array, name, displayName) => (

    <Dropdown drop="right" style={{ display: "inline-block", marginBottom: "0.5rem", marginTop: "0.5rem", marginRight: "0.5rem" }}>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        {displayName}
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
          <Field type="text" name="name" placeholder="haku nimellä" className="form-control" />
          {createCheckboxesFromArray(stores, "store", "kauppa")}
          {createCheckboxesFromArray(categories, "category", "kategoria")}
          <Dropdown drop="right" style={{ display: "inline-block", marginBottom: "0.5rem", marginTop: "0.5rem", marginRight: "0.5rem", width: "20rem" }}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              min/max
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {minMaxItems.map(item => (
                <Dropdown.ItemText key={item.name}>
                  <span style={{ width: "6rem", display: "inline-block" }}>{item.displayName}</span>
                  <Field type="number" min="0" max={searchVariables[`max${item.name}`] ? searchVariables[`max${item.name}`] - 1 : null} name={`min${item.name}`} style={{ display: "inline-block", width: "5rem" }} placeholder="min" className="form-control" />
                    -
                  <Field type="number" min={searchVariables[`min${item.name}`] ? searchVariables[`min${item.name}`] + 1 : 0} name={`max${item.name}`} style={{ display: "inline-block", width: "5rem" }} placeholder="max" className="form-control" />
                </Dropdown.ItemText>
              ))}
            </Dropdown.Menu>
          </Dropdown >
          <div><Button type="submit" variant="dark">Haku</Button></div>
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