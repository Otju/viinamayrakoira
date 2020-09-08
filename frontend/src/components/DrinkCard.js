import React from 'react'
import Card from 'react-bootstrap/Card'
import { capitalizeFirst, stores, categories } from '../utils'

const DrinkCard = ({ drink, position, hasRightMargin }) => {

    const storeColor = stores.find(store => drink.store === store.name).color

    const margin = {}
    if (position === 2) {
        margin.marginLeft = "1rem"
        margin.marginRight = hasRightMargin ? "1rem" : null
    }

    const categoryObject = categories.find(category => category.name === drink.category)

    return (
        <Card style={{ ...margin, marginTop: "1rem" }}>
            <div style={{ background: storeColor, height: "0.5rem" }}></div>
            <div style={{ background: categoryObject ? categoryObject.color : null, height: "0.5rem" }}></div>
            <Card.Body style={{ position: "relative" }}>
                {drink.sticker ? <div style={{ position: "absolute", top: "-20px", right: "-20px" }}>
                    <svg id="svgelem" viewBox="0 0 200 200">
                        <polygon points="100,10 40,180 190,60 10,60 160,180" fill="yellow" />
                    </svg>
                    {drink.sticker}
                </div>
                    : null}
                <Card.Title style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", height: "3rem" }}>
                    <a rel="noopener noreferrer" style={{ color: "black" }} target="_blank" href={drink.link}>{drink.name}</a>
                </Card.Title>
                <Card.Subtitle>{capitalizeFirst(drink.category)}</Card.Subtitle>
                <Card.Img variant="top" src={drink.imageLink} style={{ maxWidth: "50%", maxHeight: "20rem", width: "auto", height: "auto", mixBlendMode: "multiply" }} />
                <Card.Text style={{ display: 'inline-block', padding: "5%", maxWidth: "50%" }}>
                    {drink.price}€<br></br>
                    {drink.percentage}%<br></br>
                    {drink.size}l<br></br>
                    {drink.pricePerLitre}€/l<br></br>
                    {drink.portionAmount} annosta<br></br>
                    {drink.pricePerPortion} €/annos<br></br>
                    {stores.find(store => store.name === drink.store).displayName}<br></br>
                    {capitalizeFirst(drink.producer)}<br></br>
                </Card.Text>
            </Card.Body>
        </Card >
    )
}

export default DrinkCard