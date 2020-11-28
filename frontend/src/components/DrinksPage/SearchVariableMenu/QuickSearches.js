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
    },
    {
      name: "Miedot (alle 10%)",
      searches: {
        maxpercentage: "10",
        minpercentage: ""
      }
    },
    {
      name: "18v (Alle 22%)",
      searches: {
        maxpercentage: "22",
        minpercentage: ""
      }
    },
    {
      name: "Vahvat (yli 22%)",
      searches: {
        minpercentage: "22",
        maxpercentage: ""
      }
    }
  ]

  console.log(searchVariables)

  searches = searches.map(search => ({
    ...search,
    selected: Object.entries(search.searches).every(([key, value]) => _.isEqual(searchVariables[key], value))
  })
  )

  const dividers = [1, 3]

  return <div style={{ display: "inline-block", marginTop: "0.5rem", marginRight: "0.5rem" }}>
    <Dropdown style={{ display: "inline-block" }}>
      <Dropdown.Toggle ><b>Pikahaku</b></Dropdown.Toggle>
      <Dropdown.Menu>
        {searches.map((item, i) => (
          <div key={item.name}>
            <HoverableDropDownText selected={item.selected} handleClick={() => setSearchVariables({
              ...searchVariables,
              ...(item.selected ? Object.fromEntries(Object.keys(item.searches).map(key => ([key, emptySearchVariables[key]]))) : item.searches)
            })}>
              {item.name}
            </HoverableDropDownText>
            {dividers.find(item => item === i) && <Dropdown.Divider />}
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown >
  </div >
}

export default QuickSearches