import React from "react"
import ListGroup from "react-bootstrap/ListGroup"
import StarReview from "./StarReview"
import LikeButton from "./LikeButton"



const Comment = ({ review, noLike }) => {

  return < ListGroup.Item >
    <h4>{review.user.username}</h4>
    {review.comment}
    <StarReview size={25} value={review.taste} />
    <StarReview size={30} value={review.priceQualityRatio} type="PQR" />
    {!noLike && <LikeButton review={review} />}
  </ListGroup.Item >
}

export default Comment