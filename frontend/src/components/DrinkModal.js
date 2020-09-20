import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ReactStars from "react-rating-stars-component"
import { capitalizeFirst, stores, average, colors } from '../utils'
import { useMutation, useApolloClient } from '@apollo/client'
import { ADD_REVIEW} from '../queries'

const DrinkModal = ({ drink, show, setShow, refetch}) => {

  const handleClose = () => setShow(false)
  const [username, setUsername] = useState("")
  const [comment, setComment] = useState("")
  const [taste, setTaste] = useState(undefined)
  const [priceQualityRatio, setPriceQualityRatio] = useState(undefined)
  const [addReview] = useMutation(ADD_REVIEW)

  const client = useApolloClient()

  const handleSubmit = (event) => {
    event.preventDefault()
    const review = { drink: drink.id, taste, priceQualityRatio, username, comment }
    addReview({ variables: { review } })
    refetch()
  }

  return <Modal size="lg" show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{drink.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div style={{ display: 'inline-block', width: "50%" }}>
        <img src={drink.imageLink} alt={drink.imageLink}
          style={{ maxWidth: "100%", maxHeight: "18rem", width: "auto", height: "auto", mixBlendMode: "multiply", "marginTop": "-22rem" }} />
      </div>
      <div style={{ display: 'inline-block', width: "50%", height: "20rem", marginBottom: "auto", marginTop: "auto" }}>
        {capitalizeFirst(drink.category)}<br />
        {drink.price}€<br />
        {drink.percentage}%<br />
        {drink.size}l<br />
        {drink.pricePerLitre}€/l<br />
        {drink.portionAmount} annosta<br />
        {drink.pricePerPortion} €/annos<br />
        {stores.find(store => store.name === drink.store).displayName}<br />
        {capitalizeFirst(drink.producer)}<br />
        <ReactStars size={30} isHalf={true} value={average(drink.reviews, "taste") / 2} edit={false} />
        <ReactStars char="€" size={45} activeColor="green" isHalf={true} value={average(drink.reviews, "priceQualityRatio") / 2} edit={false} />
        {drink.reviews.length} arvostelua <br />
      </div>
      <h3>Arvostele</h3>
      <div style={{ border: "solid", borderColor: colors.lightGray, padding: "1rem", paddingLeft: "0.3rem" }}>
        <Form onSubmit={handleSubmit}>
          <ReactStars size={30} isHalf={true} onChange={(newValue) => setTaste(newValue * 2)} />
          <ReactStars char="€" size={45} activeColor="green" isHalf={true} onChange={(newValue) => setPriceQualityRatio(newValue * 2)} />
          <Form.Control type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="nimimerkki (vaihtoehtoinen)"></Form.Control>
          <Form.Control type="text" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="kommentti (vaihtoehtoinen)"></Form.Control>
          <Form.Control type="submit" value="Lähetä"></Form.Control>
        </Form>
      </div>
      <h3>Kommentit</h3>
      <div>
        <ul>
          {drink.reviews.map(review => <li key={review.id}>
            <h4>{review.username}</h4>
            {review.comment}
            <ReactStars size={25} isHalf={true} value={review.taste / 2} edit={false} />
            <ReactStars size={30} isHalf={true} char="€" activeColor="green" value={review.priceQualityRatio / 2} edit={false} />
          </li>
          )}
        </ul>
      </div>
    </Modal.Body>
  </Modal>
}

export default DrinkModal