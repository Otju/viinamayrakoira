import React from "react"
import { capitalizeFirst, stores } from "../../utils"
import Button from "react-bootstrap/Button"
import StarReview from "./StarReview"

const DrinkCard = ({ drink, showStoreButton }) => {

  const reviewCount = drink.reviewCount ?? 0
  const commentCount = drink.commentCount ?? 0

  return <>
    <div style={{ display: "inline-block", width: "50%" }}>
      <img src={drink.imageLink} alt={drink.imageLink}
        style={{ maxWidth: "100%", maxHeight: "18rem", width: "auto", height: "auto", mixBlendMode: "multiply", "marginTop": "-22rem" }} />
    </div>
    <div style={{ display: "inline-block", padding: "5%", width: "50%", height: "20rem", marginBottom: "auto", marginTop: "auto" }}>
      {drink.price}€<br />
      {drink.percentage}%<br />
      {drink.size}l<br />
      {drink.pricePerLitre}€/l<br />
      {drink.portionAmount} annosta<br />
      {drink.pricePerPortion} €/annos<br />
      {<>{capitalizeFirst(drink.producer)}<br /></> || null}
      {stores.find(store => store.name === drink.store).displayName}
      {showStoreButton ? <Button style={{ marginLeft: "10px" }} variant={drink.store} onClick={() => window.open(drink.link, "_blank")}>Kauppaan →</Button> : null}<br />
      <StarReview size={25} value={drink.tasteAverage} />
      <StarReview size={30} value={drink.priceQualityRatioAverage} type="PQR"/>
      {reviewCount} {reviewCount === 1 ? "arvostelu" : "arvostelua"} <br />
      {commentCount} {commentCount === 1 ? "kommentti" : "kommenttia"}
    </div>
  </>
}

export default DrinkCard