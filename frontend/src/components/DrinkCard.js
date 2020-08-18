import React from 'react'
import Card from 'react-bootstrap/Card'

const DrinkCard = ({ drink }) => {

    const capitalizeFirst = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <Card style={{ display: 'inline-block', width: "33%" }}>
            <Card.Body>
                <Card.Title style={{ height: "5rem" }}>{drink.name}</Card.Title>
                <Card.Subtitle>{capitalizeFirst(drink.category)}</Card.Subtitle>
                <Card.Img variant="top" src={drink.imageLink} style={{ maxWidth: "50%", maxHeight: "20rem", width: "auto", height: "auto" }} />
                <Card.Text style={{ display: 'inline-block', padding: "5%" }}>
                    {drink.price}€<br></br>
                    {drink.percentage}%<br></br>
                    {drink.size}l<br></br>
                    {capitalizeFirst(drink.store)}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default DrinkCard