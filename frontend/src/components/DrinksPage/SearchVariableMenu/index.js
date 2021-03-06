import React, { useState, useEffect } from "react"
import SearchVariableButtons from "./SearchVariableButtons"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import MinMaxDropDown from "./MinMaxDropDown"
import SortBySettings from "./SortBySettings"
import CheckboxDropDown from "./CheckboxDropDown"
import { categories, stores, colors, searchTypes, useWindowDimensions } from "../../../utils"
import _ from "lodash"
import ToggleableAccordion from "../../General/ToggleableAccordion"
import QuickSearches from "./QuickSearches"

const SearchVariableMenu = ({ searchVariables, setSearchVariables, emptySearchVariables, expandable }) => {

  const [name, setName] = useState("")

  const setFieldValue = (searchCategory, value) => {
    setSearchVariables({ ...searchVariables, [searchCategory]: value })
  }

  const { mobile } = useWindowDimensions(800)

  const handleSubmit = (event) => {
    event.preventDefault()
    setFieldValue("name", name)
  }

  useEffect(() => {
    setName(searchVariables.name)
  }, [searchVariables])

  const content = <>
    <CheckboxDropDown values={stores} name={"store"} displayName={"kauppa"} {...{ setFieldValue, searchVariables }} />
    <CheckboxDropDown values={categories} name={"category"} displayName={"kategoria"} {...{ setFieldValue, searchVariables }} />
    <MinMaxDropDown searchVariables={searchVariables} valuetypes={searchTypes} setFieldValue={setFieldValue}></MinMaxDropDown>
    <SortBySettings setFieldValue={setFieldValue} searchVariables={searchVariables} valuetypes={searchTypes} ></SortBySettings>
    {!_.isEqual(searchVariables, emptySearchVariables) ?
      <div style={{ display: "inline-block", marginTop: "0.5rem" }}><Button variant="danger" onClick={() => setSearchVariables(emptySearchVariables)}>nollaa haku</Button></div> : null
    }
    <QuickSearches setSearchVariables={setSearchVariables} searchVariables={searchVariables} emptySearchVariables={emptySearchVariables} />
    <SearchVariableButtons {...{ mobile, setFieldValue, searchVariables, setSearchVariables }} />
  </>

  return <div style={{ border: "solid", borderTop: "none", color: colors.darkGray, padding: "1rem" }}>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control type="text" placeholder="Haku" value={name} onBlur={handleSubmit} onChange={(event) => setName(event.target.value)} />
      </Form.Group>
      {expandable ?
        <ToggleableAccordion content={content} />
        : content}
    </Form>
  </div>
}

export default SearchVariableMenu