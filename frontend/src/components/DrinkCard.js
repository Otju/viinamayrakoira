import React from 'react'
import Card from 'react-bootstrap/Card'
import { capitalizeFirst, stores } from '../utils'

const DrinkCard = ({ drink, position }) => {

    const storeColor = stores.find(store => drink.store === store.name).color

    const margin = {}
    if (position === 2) {
        margin.marginLeft = "1rem"
        margin.marginRight = "1rem"
    }

    return (
        <Card style={{ ...margin, marginTop: "1rem" }}>
            <div style={{ background: storeColor, height: "0.5rem" }}></div>
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
                    {drink.categorystore}<br></br>
                    {capitalizeFirst(drink.producer)}<br></br>
                </Card.Text>
            </Card.Body>
        </Card >
    )
}

export default DrinkCard