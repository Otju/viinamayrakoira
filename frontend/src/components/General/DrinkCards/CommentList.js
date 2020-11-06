import React from 'react'
import ReactStars from "react-rating-stars-component"
import Chart from '../../StatisticsPage/Chart'
import ListGroup from 'react-bootstrap/ListGroup'
import { round } from '../../../utils'
import StarReview from './StarReview'

const CommentList = ({ reviews, drink }) => {
  if (!reviews || reviews.length === 0) {
    return <><br />Ei vielä arvosteluja</>
  }
  let groupedReviews = []
  for (let i = 1; i <= 10; i++) {
    const name = round(i / 2).toString()
    groupedReviews.push({ group: name, tasteCount: 0, PQRCount: 0, name })
    //color: `hsl(120,100%,${25+(i/2*10)}%)`
  }
  reviews.forEach(review => {
    const taste = round(review.taste / 2).toString()
    const PQR = round(review.priceQualityRatio / 2).toString()
    groupedReviews = groupedReviews.map(item => item.group === taste ? { ...item, tasteCount: item.tasteCount + 1 } : item)
    groupedReviews = groupedReviews.map(item => item.group === PQR ? { ...item, PQRCount: item.PQRCount + 1 } : item)
  })

  return <div>

    <Chart rawData={groupedReviews} field={"tasteCount"}
      name={<>Maku <div style={{ display: "flex", justifyContent: "center" }}>
        <StarReview size={25} value={drink.tasteAverage} />
      </div></>}
      type="bar" defaultColor={"gold"} dontSort={true} showPercentage={true} useAxis={true} />

    <Chart rawData={groupedReviews} field={"PQRCount"}
      name={<>Hinta-laatu
      <div style={{ display: "flex", justifyContent: "center" }}>
      <StarReview size={30} value={drink.priceQualityRatioAverage} type="PQR" />
        </div></>}
      type="bar" defaultColor={"green"} dontSort={true} showPercentage={true} useAxis={true} />

    <div>
      <ListGroup>
        {reviews?.filter((item) => item.comment).map(review =>
          <ListGroup.Item key={review.id}>
            <h4>{review.username}</h4>
            {review.comment}
            <StarReview size={25} value={review.taste} />
            <StarReview size={30} value={review.priceQualityRatio} type="PQR" />
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  </div>
}

export default CommentList