import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { capitalizeFirst, stores, categories } from '../utils'
import HoverableLink from './HoverableLink'
import Hoverable from './Hoverable'


const DrinkCard = ({ drink, position, hasRightMargin }) => {

    const storeColor = stores.find(store => drink.store === store.name).color

    const margin = {}
    if (position === 2) {
        margin.marginLeft = "1rem"
        margin.marginRight = hasRightMargin ? "1rem" : null
    }

    margin.marginTop = drink.sticker ?  "4rem" : "1rem"

    const categoryObject = categories.find(category => category.name === drink.category)

    return (
        <Card style={{ ...margin }}>
            <div style={{ background: storeColor, height: "0.5rem" }}></div>
            <div style={{ background: categoryObject ? categoryObject.color : null, height: "0.5rem" }}></div>
            <HoverableLink zIndex={5} link={`drinks?=searchvariables`}>
                {drink.sticker ? <div style={{ position: "absolute", top: "-4.5rem", left: "-3rem", width: "12rem", transform: "rotate(-10deg)" }}>
                    <img src={process.env.PUBLIC_URL + '/doggoColor.svg'} style={{ fill: "red" }} alt="viinamayrakoira.svg" />
                    {drink.sticker.split(" ").map((part, i) =>
                        <div key={i} style={{ whiteSpace: "pre-wrap", position: "absolute", top: `${i+2.3}rem`, textAlign: "center", width: "100%" }}><b>{part}</b></div>)}
                </div>
                    : null}
            </HoverableLink>
            <div style={{ height: "100%" }} >
                <HoverableLink zIndex={2} link={`drinks/${drink.id}`}>
                    <Card.Body style={{ background: "white", zIndex: "-1", position: "relative", height: "100%" }}>
                        <Card.Title style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", height: "3rem" }}>
                            {drink.name}
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
                </HoverableLink>
            </div>
            <div style={{ position: "absolute", bottom: "1rem", right: "2rem" }}>
                <Hoverable zIndex="5" handleClick={() => window.open(drink.link, "_blank")}><Button variant={drink.store}>Kauppaan →</Button></Hoverable>
            </div>
        </Card >
    )
}

export default DrinkCard