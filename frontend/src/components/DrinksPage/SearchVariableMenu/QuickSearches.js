import React from "react"
import Dropdown from "react-bootstrap/Dropdown"
import HoverableDropDownText from "./HoverableDropDownText"
import _ from "lodash"

const QuickSearches = ({ setSearchVariables, searchVariables, emptySearchVariables }) => {

  let searches = [
    {
      name: "Maukkaimmat",
      searches: {
        sortByDescending: true,
        sortByField: "tasteAverage"
      }
    },
    {
      name: "Paras hinta-laatu",
      searches: {
        sortByDescending: true,
        sortByField: "priceQualityRatioAverage"
      }
    },
    {
      name: "Suomalaiset kaupat",
      searches: {
        store: ["alko", "foodie", "kmarket"],
      }
    },
    {
      name: "Tallinnan ristely",
      searches: {
        store: ["superAlkoEesti", "tallink", "eckeroLine"],
      }
    }
  ]

  searches = searches.map(search => ({
    ...search,
    selected: Object.entries(search.searches).every(([key, value]) => _.isEqual(searchVariables[key], value))
  })
  )

  return <div style={{ display: "inline-block", marginTop: "0.5rem", marginRight: "0.5rem" }}>
    <Dropdown style={{ display: "inline-block" }}>
      <Dropdown.Toggle ><b>Pikahaku</b></Dropdown.Toggle>
      <Dropdown.Menu>
        {searches.map(item => (
          <HoverableDropDownText key={item.name} selected={item.selected} handleClick={() => setSearchVariables({
            ...searchVariables,
            ...(item.selected ? Object.fromEntries(Object.keys(item.searches).map(key => ([key, emptySearchVariables[key]]))) : item.searches)
          })}>
            {item.name}
          </HoverableDropDownText>
        ))}
      </Dropdown.Menu>
    </Dropdown >
  </div >
}

export default QuickSearches