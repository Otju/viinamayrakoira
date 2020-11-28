import React, { useState, useEffect } from "react"
import { useMutation, gql } from "@apollo/client"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { ADD_REVIEW, DELETE_REVIEW } from "../../queries"
import StarReview from "./StarReview"
import AlertBox from "./AlertBox"
import { useField, useUserInfo } from "../../utils"
import Comment from "./Comment"

const ReviewForm = ({ drink, reviews, refetchComments, setReviews, setDrinkState }) => {

  const userInfo = useUserInfo()
  const [oldReview, setOldReview] = useState(false)
  const [edit, setEdit] = useState(false)
  const [taste, setTaste] = useState("")
  const [priceQualityRatio, setPriceQualityRatio] = useState("")
  const [validated, setValidated] = useState(false)
  const [alert, setAlert] = useState(null)
  const comment = useField("textarea", "kommentti")

  const resetFields = () => {
    setTaste(null)
    setPriceQualityRatio(null)
    comment.set("")
    setValidated(false)
  }

  useEffect(() => {
    const oldReview = reviews?.find(review => review?.user?.id === userInfo.id)
    if (oldReview) {
      setTaste(oldReview.taste)
      setPriceQualityRatio(oldReview.priceQualityRatio)
      comment.set(oldReview.comment || "")
      setOldReview(oldReview)
    } else {
      setOldReview(false)
      resetFields()
    }

    // eslint-disable-next-line
  }, [reviews])



  const [addReview] = useMutation(ADD_REVIEW, {
    onError: (error) => {
      setAlert({ message: error.message, variant: "danger" })
    },
    update: (cache, response) => {
      const newReview = response.data.addReview.review
      const { tasteAverage, priceQualityRatioAverage, reviewCount, commentCount } = response.data.addReview
      const changeDrinkFields = { tasteAverage, priceQualityRatioAverage, reviewCount, commentCount }
      cache.writeFragment({
        id: `Drink:${newReview.drink}`,
        fragment: gql`
        fragment modifiedDrink on Drink {
          tasteAverage
          priceQualityRatioAverage
          reviewCount
          commentCount
        }`,
        data: changeDrinkFields
      })
      setDrinkState(d => ({ ...d, ...changeDrinkFields }))
    }, onCompleted: () => {
      setAlert({ message: "Kiitos arvostelusta!", variant: "success" })
      setEdit(false)
      refetchComments()
    }
  })

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    update: (cache, response) => {
      const { tasteAverage, priceQualityRatioAverage, reviewCount, commentCount, id } = response.data.deleteReview
      cache.evict({ id: `Review:${id}` })
      setReviews(r => r.filter(review => review.id.toString() !== id.toString()))
      setDrinkState(d => ({ ...d, tasteAverage, priceQualityRatioAverage, reviewCount, commentCount }))
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setValidated(true)
    if (priceQualityRatio && taste) {
      const review = { drink: drink.id, taste, priceQualityRatio, comment: comment.value }
      addReview({ variables: { review } })
    } else {
      setAlert({ message: "Täytä kaikki tarvittavat kentät", variant: "danger" })
    }
  }

  const handeDelete = () => {
    deleteReview({ variables: { reviewId: oldReview?.id, drinkId: drink.id } })
  }

  return <div style={{ marginTop: "2rem" }}>
    <h3>Arvostele</h3>
    <AlertBox alert={alert?.message} setAlert={setAlert} variant={alert?.variant} />
    {userInfo.id
      ? <>
        {oldReview && !edit
          ? <div>
            <Button variant="success" onClick={() => { setEdit(true) }}>Muokkaa arvostelua</Button>
            <Button variant="danger" onClick={() => handeDelete()}>Poista arvostelu</Button>
            <Comment review={oldReview} />
          </div>
          : <Form noValidate onSubmit={handleSubmit} >
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
            <Form.Row>
              {edit && <Col><Button variant="danger" style={{ width: "100%" }} onClick={() => setEdit(false)}>Peruuta</Button></Col>}
              <Col><Button type="submit" variant="success" style={{ width: "100%" }}>Lähetä</Button></Col>
            </Form.Row>
          </Form>
        }
      </>
      : <>
        <p>Sinun täytyy kirjautua sisään arvostellaksesi juoman</p>
        <p>Pääset kirjautumaan sisään tai rekisteröimään uuden tilin ylävalikon kohdasta <i>Kirjaudu sisään</i></p>
      </>
    }

  </div>
}

export default ReviewForm