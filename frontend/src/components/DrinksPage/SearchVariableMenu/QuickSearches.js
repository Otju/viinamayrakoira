import React from "react"
import Button from "react-bootstrap/Button"

const QuickSearches = ({ setSearchVariables, searchVariables }) => {

  const searches = [
    {
      name: "Maukkaimmat",
      searches: {
        sortByDescending: "true",
        sortByField: "tasteAverage"
      },
    },
    {
      name: "Paras hinta-laatu",
      searches: {
        sortByDescending: "true",
        sortByField: "priceQualityRatioAverage"
      },
    },
    {
      name: "Suomalaiset kaupat",
      searches: {
        store: ["alko", "foodie", "kmarket"],
      },
    },
    {
      name: "Tallinnan ristely",
      searches: {
        store: ["superAlkoEesti", "tallink", "eckeroLine"],
      },
    }
  ]

  return <div>
    {searches.map(item => <Button key={item.name}
      onClick={() => setSearchVariables({ ...searchVariables, ...item.searches })}>
      {item.name}
    </Button>)
    }
  </div >
}

export default QuickSearches