import React, { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { ADD_REVIEW } from '../../../queries'
import StarReview from './StarReview'
import AlertBox from '../AlertBox'
import { useField, useUserInfo } from './../../../utils'

const ReviewForm = ({ drink, setReviews, reviews, setDrinkState }) => {

  const userInfo = useUserInfo()
  const [hasPreviousReview, setHasPreviousReview] = useState(false)
  const [taste, setTaste] = useState("")
  const [priceQualityRatio, setPriceQualityRatio] = useState("")
  const [validated, setValidated] = useState(false)
  const [alert, setAlert] = useState(null)
  const comment = useField("textarea", "kommentti")

  useEffect(() => {
    const oldReview = reviews?.find(review => review?.user?.id === userInfo.id) || {}
    if (oldReview) {
      setTaste(oldReview.taste)
      setPriceQualityRatio(oldReview.priceQualityRatio)
      comment.set(oldReview.comment || "")
      setHasPreviousReview(true)
    }
    // eslint-disable-next-line
  }, [reviews])


  const [addReview] = useMutation(ADD_REVIEW, {
    update: (cache, response) => {
      const newReview = response.data.addReview.review
      const { tasteAverage, priceQualityRatioAverage, reviewCount, commentCount } = response.data.addReview
      setReviews(reviews.find(review => review.id === newReview.id)
        ? reviews.map(review => review.id === newReview.id ? newReview : review)
        : [newReview, ...reviews])
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
    if (priceQualityRatio && taste) {
      const review = { drink: drink.id, taste, priceQualityRatio, comment: comment.value }
      addReview({ variables: { review } })
      setAlert({ message: "Kiitos arvostelusta!", variant: "success" })
    } else {
      setAlert({ message: "Täytä kaikki tarvittavat kentät", variant: "danger" })
    }
  }

  return <div style={{ marginTop: "2rem" }}>
    <h3>Arvostele</h3>
    <AlertBox alert={alert?.message} setAlert={setAlert} variant={alert?.variant} />
    {userInfo.id
      ? <>
        {hasPreviousReview ? "Olet jos arvostellut tämän juoman" : null}
        <Form noValidate onSubmit={handleSubmit} disabled>
          <Form.Row>
            <Col>
              <StarReview setter={setTaste} isInvalid={!taste && validated} value={taste} showHeader />
            </Col>
            <Col>
              <StarReview type={"PQR"} setter={setPriceQualityRatio} isInvalid={!priceQualityRatio && validated} value={priceQualityRatio} showHeader />
            </Col>
          </Form.Row>
          {comment.field}
          <br />
          <Form.Control type="submit" value="Lähetä"></Form.Control>
        </Form>
      </>
      : "Sinun täytyy kirjautua sisään"
    }

  </div>
}

export default ReviewForm