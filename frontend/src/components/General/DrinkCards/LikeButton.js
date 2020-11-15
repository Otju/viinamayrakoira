import React, { useState } from "react"
import Hoverable from '../Hoverable'
import { useMutation, gql } from "@apollo/client"
import { LIKE } from "../../../queries"
import { useUserInfo } from "../../../utils"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"


const LikeButton = ({ review }) => {

  const userInfo = useUserInfo()
  const [liked, setLiked] = useState(review?.usersThatLiked.find(id => id.toString() === userInfo?.id?.toString()))
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

  const likePicture = <img src={`${process.env.PUBLIC_URL}/${liked ? "likedLike.svg" : "like.svg"}`} style={{ height: "3rem", marginBottom: "18px" }} alt="like" />

  const likeButton = userInfo?.id
    ? <Hoverable handleClick={() => handleClick()}>{likePicture}</Hoverable>
    : <OverlayTrigger overlay={<Tooltip>Sinun täytyy kirjautua sisään tykätäksesi</Tooltip>}>{likePicture}</OverlayTrigger>

  return <>
    <div style={{ display: "inline-block", fontSize: "20px", fontWeight: liked ? "bold" : "normal" }}>{likes}</div>
    <div style={{ display: "inline-block" }}>
      {likeButton}
    </div>
  </>
}

export default LikeButton