import React from "react"
import { GET_REVIEWS, DELETE_REVIEW } from "../queries"
import { useQuery, useMutation } from "@apollo/client"
import Comment from "./General/Comment"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"

const AdminPage = () => {
  const result = useQuery(GET_REVIEWS)
  const [deleteReview] = useMutation(DELETE_REVIEW)

  if (!result || !result.data || result.loading) {
    return null
  }

  const reviews = result.data.getReviews

  return <div className="container">
    <ListGroup>
      {reviews.concat().sort((a, b) => b.comment.length - a.comment.length).map(review =>
        <div key={review.id} style={{marginBottom: "1rem", background: "white"}}>
          <Comment review={review} noLike />
          <Button variant="danger" onClick={() => deleteReview({ variables: { reviewId: review.id, drinkId: review.drink } })}>Poista arvostelu</Button>
        </div>
      )}
    </ListGroup>
  </div>
}

export default AdminPage