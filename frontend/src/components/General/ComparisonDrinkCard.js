import React from "react"
import DrinkCard from "./DrinkCard"
import DrinkSearchBox from "./DrinkSearchBox"
import { round, searchTypes } from "../../utils"
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"

const ComparisonDrinkCard = ({ drinks, index, setDrinks }) => {

  const drink = drinks[index]

  if (drink) {
    let fieldsThatAreBetter = []
    let comparisonDrink = { ...drink }
    let drinkToCompareTo = index === 0 ? drinks[1] : drinks[0]
    if (drinkToCompareTo) {
      Object.entries(comparisonDrink).forEach(([key, value]) => {
        if (["price", "percentage", "size", "pricePerLitre", "portionAmount", "pricePerPortion", "tasteAverage", "priceQualityRatioAverage"].includes(key)) {
          let difference = round(value - drinkToCompareTo[key])
          if (difference === 0) {
            difference = ""
          }
          const isPositive = difference > 0
          let isBetter = isPositive
          if (key === "price" || key === "pricePerPortion" || key === "pricePerLitre") {
            isBetter = !isBetter
          }
          if (isBetter) {
            const name = searchTypes.find(item => item.name === key).displayName
            fieldsThatAreBetter.push({ name, isPositive })
          }
          if (key !== "tasteAverage" && key !== "priceQualityRatioAverage") {
            comparisonDrink[key] = <>{value} (<b style={{ color: isBetter ? "green" : "red" }}>{`${isPositive ? "+" : ""}${difference}`})</b></>
          }
        }
      })
    }
    return <>
      <div style={{ position: "absolute", right: "16px", top: "16px", zIndex: 9000 }}>
        <Button variant="danger" onClick={() => setDrinks(d => d.map((item, i) => index === i ? null : item))}>×</Button>
      </div>
      <DrinkCard drink={comparisonDrink} />
      <ListGroup>
        {fieldsThatAreBetter.map(field => {
          let adjective = field.isPositive ? "Suurempi" : "Pienempi"
          if(["maku", "hinta-laatu"].includes(field.name)){
            adjective = "Parempi"
          }
          return <ListGroup.Item variant="success" key={field.name}>{adjective} {field.name}</ListGroup.Item>
        }
        )}
      </ListGroup>
    </>
  } else if (index === 1 && !drinks[0]) {
    return null
  }
  else {
    return <DrinkSearchBox keyPart={index} handleClick={(drink) => setDrinks(d => d.map((item, i) => index === i ? drink : item))} />
  }
}
export default ComparisonDrinkCard