import React from 'react'
import { capitalizeFirst, stores } from '../../../utils'
import ReactStars from "react-rating-stars-component"

const DrinkCard = ({ drink }) => {

  const reviewCount = drink.reviewCount ?? 0
  const commentCount = drink.commentCount ?? 0

  return <>
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
      {reviewCount} {reviewCount === 1 ? "arvostelu" : "arvostelua"} <br />
      {commentCount} {commentCount === 1 ? "kommentti" : "kommenttia"}
    </div>
  </>
}

export default DrinkCard