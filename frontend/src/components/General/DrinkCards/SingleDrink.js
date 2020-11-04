import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import CommentList from './CommentList'
import ReactStars from "react-rating-stars-component"
import { colors } from '../../../utils'
import { useMutation, gql, useQuery } from '@apollo/client'
import { ADD_REVIEW, GET_REVIEWS } from '../../../queries'
import DrinkInfo from './DrinkInfo'

const SingleDrink = ({ drink }) => {

  const [username, setUsername] = useState("")
  const [comment, setComment] = useState("")
  const [taste, setTaste] = useState(undefined)
  const [priceQualityRatio, setPriceQualityRatio] = useState(undefined)
  const result = useQuery(GET_REVIEWS, { variables: { id: drink.id } })
  const [reviews, setReviews] = useState(null)
  const [drinkState, setDrinkState] = useState(drink)
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

      setDrinkState({ ...drink, tasteAverage, priceQualityRatioAverage, reviewCount, commentCount  })
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const review = { drink: drink.id, taste, priceQualityRatio, username, comment }
    addReview({ variables: { review } })
  }

  useEffect(() => {
    if (result && !result.loading) {
      setReviews(result.data.getReviews)
    }
  }, [result])

  return <div>
    <DrinkInfo drink={drinkState} showStoreButton={true}/>
    <div>
      {drinkState.description}
      <br/>
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
    {(reviews) ? <CommentList reviews={reviews} /> : "Ei kommentteja"}

  </div>
}

export default SingleDrink