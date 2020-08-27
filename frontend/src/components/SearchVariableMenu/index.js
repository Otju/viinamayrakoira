import React from 'react'
import { Formik, Form, Field } from 'formik'
import { capitalizeFirst } from '../../utils'
import SearchVariableButton from './SearchVariableButton'
import MinMaxDropDown from './MinMaxDropDown'
import SortBySettings from './SortBySettings'
import Dropdown from 'react-bootstrap/Dropdown'
import HoverableDropDownText from './HoverableDropDownText'

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

  const handleClick = (item, name, setFieldValue, handleSubmit) => {
    console.log(searchVariables[name])
    if (searchVariables[name] && searchVariables[name].find(searchVar => searchVar === item)) {
      console.log(searchVariables[name].filter(searchVar => searchVar !== item))
      setFieldValue(name, searchVariables[name].filter(searchVar => searchVar !== item))
    } else {
      setFieldValue(name, [...searchVariables[name] ?? [], item])
    }
    handleSubmit()
  }

  const createCheckboxesFromArray = (array, name, displayName, setFieldValue, handleSubmit) => (
    <Dropdown drop="right" style={{ display: "inline-block", marginTop: "0.5rem", marginRight: "0.5rem" }}>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        {displayName}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {array.map(item => {
          let selected = false
          if (searchVariables[name] && searchVariables[name].find(searchVar => searchVar === item)){
            selected = true
          }
          return (
            <Dropdown.ItemText key={item}>
              <HoverableDropDownText selected={selected} handleClick={() => handleClick(item, name, setFieldValue, handleSubmit)} content={
                <>{capitalizeFirst(item)}</>} />
            </Dropdown.ItemText>
          )
        })}
      </Dropdown.Menu>
    </Dropdown >
  )

  const valuetypes = [
    { name: "price", displayName: "hinta" },
    { name: "percentage", displayName: "vahvuus" },
    { name: "size", displayName: "tilavuus" },
    { name: "pricePerLitre", displayName: "litrahinta" },
    { name: "portionAmount", displayName: "annosmäärä" },
    { name: "pricePerPortion", displayName: "annoshinta" }
  ]

  const initialMinMax = {}
  valuetypes.forEach(item => {
    initialMinMax[`min${item.name}`] = ""
    initialMinMax[`max${item.name}`] = ""
  })

  return <div style={{ border: "solid", padding: "1rem" }}>
    <Formik
      initialValues={{ name: "", sortByField: "pricePerPortion", store: [], category: [], falsesortByDescending: false, ...initialMinMax }}
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
        <Form onSubmit={handleSubmit} className="form-group">
          <Field type="text" name="name" placeholder="haku nimellä" className="form-control" />
          {createCheckboxesFromArray(stores, "store", "kauppa", setFieldValue, handleSubmit)}
          {createCheckboxesFromArray(categories, "category", "kategoria", setFieldValue, handleSubmit)}
          <MinMaxDropDown searchVariables={searchVariables} valuetypes={valuetypes}></MinMaxDropDown>
          <SortBySettings setFieldValue={setFieldValue} searchVariables={searchVariables} handleSubmit={handleSubmit} valuetypes={valuetypes} ></SortBySettings>
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