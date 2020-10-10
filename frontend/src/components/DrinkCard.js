import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { capitalizeFirst, stores, categories } from '../utils'
import Hoverable from './Hoverable'
import ReactStars from "react-rating-stars-component"
import DrinkModal from './DrinkModal'

const DrinkCard = ({ drink, position, hasRightMargin, refetch }) => {

    const storeColor = stores.find(store => drink.store === store.name).color
    const textColor = stores.find(store => drink.store === store.name).textColor || "black"

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)

    const margin = {}
    if (position === 2) {
        margin.marginLeft = "1rem"
        margin.marginRight = hasRightMargin ? "1rem" : null
    }
    margin.marginTop = "1rem"

    let queryStrings = ""
    if (drink.sticker) {
        queryStrings += drink.allStores ? "" : `store=${drink.store}`
        switch (drink.sticker) {
            case "Paras maku":
                queryStrings += "&sortByField=tasteAverage&sortByDescending=true"
                break;
            case "Paras hinta-laatu":
                queryStrings += "&sortByField=priceQualityRatioAverage&sortByDescending=true"
                break;
            default:
                break;
        }
        margin.marginTop = "4rem"
    }

    const categoryObject = categories.find(category => category.name === drink.category)

    return (
        <Card style={{ ...margin }}>
            <div style={{ background: storeColor, height: "0.5rem" }}></div>
            <div style={{ background: categoryObject ? categoryObject.color : null, height: "0.5rem" }}></div>
            {drink.sticker ?
                <Hoverable zIndex={5} link={`drinks?${queryStrings}`}>
                    <div style={{ position: "absolute", top: "-4.5rem", left: "-3rem", width: "12rem", transform: "rotate(-10deg)" }}>
                        <img src={process.env.PUBLIC_URL + '/doggoColor.svg'} style={{ fill: "red" }} alt="viinamayrakoira.svg" />
                        {drink.sticker.split(" ").map((part, i) =>
                            <div key={i} style={{ whiteSpace: "pre-wrap", position: "absolute", top: `${i + 2.3}rem`, textAlign: "center", width: "100%" }}><b>{part}</b></div>)}
                    </div>
                </Hoverable>
                : null}
            <div style={{ height: "100%" }} >
                <Hoverable zIndex={2} handleClick={handleShow}>
                    <Card.Body style={{ background: "white", zIndex: "-1", position: "relative", height: "100%" }}>
                        <Card.Title style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", height: "3rem" }}>
                            {drink.name}
                        </Card.Title>
                        <Card.Subtitle>{capitalizeFirst(drink.category)}</Card.Subtitle>
                        <div style={{ display: 'inline-block', width: "50%" }}>
                            <img src={drink.imageLink} alt={drink.imageLink}
                                style={{ maxWidth: "100%", maxHeight: "18rem", width: "auto", height: "auto", mixBlendMode: "multiply", "marginTop": "-22rem" }} />
                        </div>
                        <div style={{ display: 'inline-block', padding: "5%", width: "50%", height: "20rem", marginBottom: "auto", marginTop: "auto" }}>
                            {drink.price}€<br />
                            {drink.percentage}%<br />
                            {drink.size}l<br />
                            {drink.pricePerLitre}€/l<br />
                            {drink.portionAmount} annosta<br />
                            {drink.pricePerPortion} €/annos<br />
                            {stores.find(store => store.name === drink.store).displayName}<br />
                            {capitalizeFirst(drink.producer)}<br />
                            <ReactStars size={25} isHalf={true} value={(drink.tasteAverage || 0) / 2} edit={false} />
                            <ReactStars char="€" size={30} activeColor="green" isHalf={true} value={(drink.priceQualityRatioAverage || 0) / 2} edit={false} />
                            {drink.reviews?.length} arvostelua <br />
                            {drink.reviews?.filter(review => review.comment).length} kommenttia
                        </div>
                    </Card.Body>
                </Hoverable>
            </div>
            <div style={{ position: "absolute", bottom: "1.5rem", left: "2rem" }}>
                <Hoverable zIndex="5" handleClick={() => window.open(drink.link, "_blank")}><Button style={{color: textColor}}variant={drink.store}>Kauppaan →</Button></Hoverable>
            </div>
            <DrinkModal {...{ setShow, show, drink, refetch }} />
        </Card >
    )
}

export default DrinkCard