import React from 'react'
import ReactStars from "react-rating-stars-component"

const CommentList = ({ reviews }) => {
  return <div>
    <h3>Kommentit</h3>
    <div>
      <ul>
        {reviews?.map(review => <li key={review.id}>
          <h4>{review.username}</h4>
          {review.comment}
          <ReactStars size={25} isHalf={true} value={review.taste / 2} edit={false} />
          <ReactStars size={30} isHalf={true} char="€" activeColor="green" value={review.priceQualityRatio / 2} edit={false} />
        </li>
        )}
      </ul>
    </div>
  </div>
}

export default CommentList