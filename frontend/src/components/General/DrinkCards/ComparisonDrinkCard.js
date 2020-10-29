import React from 'react'
//import { ONE_DRINK } from '../../../queries'
//import { useQuery } from '@apollo/client'
import DrinkCard from './DrinkCard'
import DrinkSearchBox from '../DrinkSearchBox'
import { round } from "../../../utils"

const ComparisonDrinkCard = ({ drinkId, drinks, index, setDrinks }) => {

    const drink = drinks[index]
    /*
        const result = useQuery(ONE_DRINK, { variables: { id: drinkId }, skip: (drink || !drinkId) })
    
        useEffect(() => {
            if (result && !result.loading && result.data) {
                setDrinks(d => d.map((item, i) => index === i ? result.data.oneDrinks : item))
            }
        }, [result, setDrinks, index])
    
        */

    if (index === 1 && !drinks[0]) {
        return null
    }
    if (drink) {
        let comparisonDrink = { ...drink }
        let drinkToCompareTo = index === 0 ? drinks[1] : drinks[0]
        if (drinkToCompareTo) {
            Object.entries(comparisonDrink).forEach(([key, value]) => {
                if (["price", "percentage", "size", "pricePerLitre", "portionAmount", "pricePerPortion"].includes(key)) {
                    let difference = round(value - drinkToCompareTo[key])
                    if (difference === 0) {
                        difference = ""
                    }
                    comparisonDrink[key] = <>{value}<b>{`${difference > 0 ? "+" : ""}${difference}`}</b></>
                }
            })
        }
        return <DrinkCard drink={comparisonDrink} />
    }
    else {
        return <DrinkSearchBox keyPart={index} handleClick={(drink) => setDrinks(d => d.map((item, i) => index === i ? drink : item))} />
    }
}
export default ComparisonDrinkCard