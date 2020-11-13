import React, { useState } from "react"
import ListGroup from "react-bootstrap/ListGroup"
import StarReview from "./StarReview"
import Hoverable from '../Hoverable'
import { useMutation, gql } from "@apollo/client"
import { LIKE } from "../../../queries"
import { useUserInfo } from "../../../utils"


const Comment = ({ review }) => {

  const userInfo = useUserInfo()
  const [liked, setLiked] = useState(review?.usersThatLiked.find(id => id.toString() === userInfo.id.toString()))
  const [likes, setLikes] = useState(review.likes || 0)

  const [like] = useMutation(LIKE, {
    onCompleted: (response) => {
      setLikes(response.likeReview.likes)
    },
    update: (cache, response) => {
      const likes = response.data.likeReview.likes
      const unLiked = response.data.likeReview.unLiked
      let usersThatLiked
      if (unLiked) {
        usersThatLiked = review.usersThatLiked.filter(id => id !== userInfo.id)
      } else {
        usersThatLiked = review.usersThatLiked.concat(userInfo.id)
      }
      const changedFields = { likes, usersThatLiked }
      cache.writeFragment({
        id: `Review:${review.id}`,
        fragment: gql`
        fragment modifiedReview on Review {
          likes
          usersThatLiked
        }`,
        data: changedFields
      })
    }
  })

  const handleClick = () => {
    setLiked(!liked)
    like({ variables: { id: review.id } })
  }

  return < ListGroup.Item >
    <h4>{review.user.username}</h4>
    {review.comment}
    <StarReview size={25} value={review.taste} />
    <StarReview size={30} value={review.priceQualityRatio} type="PQR" />
    <div style={{ display: "inline-block", fontSize: "20px", fontWeight: liked ? "bold" : "normal" }}>{likes}</div>
      <div style={{ display: "inline-block" }}>
        <Hoverable handleClick={() => handleClick()}>
          <img src={`${process.env.PUBLIC_URL}/${liked ? "likedLike.svg" : "like.svg"}`} style={{ height: "3rem", marginBottom: "18px" }} alt="like" />
        </Hoverable>
      </div>
  </ListGroup.Item >
}

export default Comment