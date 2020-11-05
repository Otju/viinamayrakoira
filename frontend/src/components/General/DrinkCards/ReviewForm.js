import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { ADD_REVIEW } from '../../../queries'
import StarReview from './StarReview'
import AlertBox from '../AlertBox'

const ReviewForm = ({ drink, setReviews, reviews, setDrinkState }) => {

  const [username, setUsername] = useState("")
  const [comment, setComment] = useState("")
  const [taste, setTaste] = useState(undefined)
  const [priceQualityRatio, setPriceQualityRatio] = useState(undefined)
  const [validated, setValidated] = useState(false)
  const [alert, setAlert] = useState(null)
  const [hasAlreadyReviewed, setHasAlreadyReviewed] = useState(false)

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
    setValidated(true)
    if (priceQualityRatio && taste && !(comment && !username)) {
      const review = { drink: drink.id, taste, priceQualityRatio, username, comment }
      addReview({ variables: { review } })
      setAlert({ message: "Kiitos arvostelusta!", variant: "success" })
      setHasAlreadyReviewed(true)
    } else {
      setAlert({ message: "Täytä kaikki tarvittavat kentät", variant: "danger" })
    }
  }

  return <div style={{ marginTop: "2rem" }}>
    <h3>Arvostele</h3>
    <AlertBox alert={alert?.message} setAlert={setAlert} variant={alert?.variant} />
    {hasAlreadyReviewed
      ? "Olet jo arvioinut tämän juoman"
      : <Form noValidate onSubmit={handleSubmit}>
        <Form.Row>
          <Col>
            <StarReview setter={setTaste} isInvalid={!taste && validated} value={taste} />
          </Col>
          <Col>
            <StarReview type={"PQR"} setter={setPriceQualityRatio} isInvalid={!priceQualityRatio && validated} value={priceQualityRatio} />
          </Col>
        </Form.Row>
        <Form.Group>
          <Form.Label>Nimimerkki</Form.Label>
          <Form.Control isInvalid={(comment && !username)} type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="nimimerkki"></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Kommentti</Form.Label>
          <Form.Control as="textarea" rows={4} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="kommentti"></Form.Control>
        </Form.Group>
        <br />
        <Form.Control type="submit" value="Lähetä"></Form.Control>
      </Form>
    }
  </div>
}

export default ReviewForm