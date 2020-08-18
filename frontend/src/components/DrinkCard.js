import React from 'react'
import Card from 'react-bootstrap/Card'

const DrinkCard = ({ drink }) => {

    const capitalizeFirst = string => {
        if (!string) {
            return null
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const store = capitalizeFirst(drink.store)

    let borderColor
    switch (store) {
        case "Alko":
            borderColor = "#E3333C"
            break
        case "Foodie":
            borderColor = "#00A651"
            break
        case "SuperAlko":
            borderColor = "#E67817"
            break
        default:
            borderColor = "black"
            break
    }

    return (
        <Card style={{ display: 'inline-block', width: "33%", borderColor: borderColor, borderWidth: "3px" }}
            onClick={ () => window.open(drink.link)}>
            <Card.Body>
                <Card.Title style={{ height: "5rem" }}>{drink.name}</Card.Title>
                <Card.Subtitle>{capitalizeFirst(drink.category)}</Card.Subtitle>
                <Card.Img variant="top" src={drink.imageLink} style={{ maxWidth: "50%", maxHeight: "20rem", width: "auto", height: "auto" }} />
                <Card.Text style={{ display: 'inline-block', padding: "5%" }}>
                    {drink.price}€<br></br>
                    {drink.percentage}%<br></br>
                    {drink.size}l<br></br>
                    {store}<br></br>
                    {capitalizeFirst(drink.producer)}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default DrinkCard