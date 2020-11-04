import React, { useState } from 'react'
import ReactStars from "react-rating-stars-component"
import { useMutation, gql } from '@apollo/client'
import Form from 'react-bootstrap/Form'
import { ADD_REVIEW } from '../../../queries'

const ReviewForm = ({ drink, setReviews, reviews, setDrinkState }) => {

  const [username, setUsername] = useState("")
  const [comment, setComment] = useState("")
  const [taste, setTaste] = useState(undefined)
  const [priceQualityRatio, setPriceQualityRatio] = useState(undefined)

  const [addReview] = useMutation(ADD_REVIEW, {
    update: (cache, response) => {
      const newReview = response.data.addReview.review
      const { tasteAverage, priceQualityRatioAverage, reviewCount, commentCount } = response.data.addReview
      setReviews([newReview, ...reviews])
      cache.writeFragment({
        id: `Drink:${newReview.drink}`,
        fragment: gql`
        fragment modifiedDrink on Drink {
          tasteAverage
          priceQualityRatioAverage
          reviewCount
          commentCount
        }`,
        data: { tasteAverage, priceQualityRatioAverage, reviewCount, commentCount }
      })

      setDrinkState({ ...drink, tasteAverage, priceQualityRatioAverage, reviewCount, commentCount })
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const review = { drink: drink.id, taste, priceQualityRatio, username, comment }
    addReview({ variables: { review } })
  }

  return <div style={{marginTop: "2rem"}}>
    <h3>Arvostele</h3>
    <Form onSubmit={handleSubmit}>
      <ReactStars size={30} isHalf={true} onChange={(newValue) => setTaste(newValue * 2)} />
      <ReactStars char="€" size={45} activeColor="green" isHalf={true} onChange={(newValue) => setPriceQualityRatio(newValue * 2)} />
      <Form.Control type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="nimimerkki (vaihtoehtoinen)"></Form.Control>
      <Form.Control as="textarea" rows={4} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="kommentti (vaihtoehtoinen)"></Form.Control>
      <Form.Control type="submit" value="Lähetä"></Form.Control>
    </Form>
  </div>
}

export default ReviewForm