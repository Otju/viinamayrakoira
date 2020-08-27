import React from 'react'
import Card from 'react-bootstrap/Card'
import { capitalizeFirst } from '../utils'

const DrinkCard = ({ drink, position }) => {

    const store = capitalizeFirst(drink.store)

    let storeColor
    switch (store) {
        case "Alko":
            storeColor = "#E3333C"
            break
        case "Foodie":
            storeColor = "#00A651"
            break
        case "SuperAlko":
            storeColor = "#E67817"
            break
        default:
            storeColor = "black"
            break
    }

    const margin = {}
    if (position === 2) {
        margin.marginLeft = "1rem"
        margin.marginRight = "1rem"
    }

    //WebkitBoxShadow: `inset 0px 0px 0px 0.2rem ${borderColor}`
    return (
        <Card style={{ ...margin, marginTop: "1rem"}}>
            <div style={{background: storeColor, height: "0.5rem"}}></div>
            <Card.Body>
                <Card.Title style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    height: "3rem"
                }}><a rel="noopener noreferrer" style={{ color: "black" }} target="_blank" href={drink.link}>{drink.name}</a></Card.Title>
                <Card.Subtitle>{capitalizeFirst(drink.category)}</Card.Subtitle>
                <Card.Img variant="top" src={drink.imageLink} style={{ maxWidth: "50%", maxHeight: "20rem", width: "auto", height: "auto" }} />
                <Card.Text style={{ display: 'inline-block', padding: "5%" }}>
                    {drink.price}€<br></br>
                    {drink.percentage}%<br></br>
                    {drink.size}l<br></br>
                    {drink.pricePerLitre}€/l<br></br>
                    {drink.portionAmount} annosta<br></br>
                    {drink.pricePerPortion} €/annos<br></br>
                    {store}<br></br>
                    {capitalizeFirst(drink.producer)}<br></br>
                </Card.Text>
            </Card.Body>
        </Card >
    )
}

export default DrinkCard