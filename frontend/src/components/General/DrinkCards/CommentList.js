import React from 'react'
import ReactStars from "react-rating-stars-component"
import Chart from '../../StatisticsPage/Chart'
import { round } from '../../../utils'

const CommentList = ({ reviews }) => {
  if(!reviews || reviews.length===0){
    return "Ei vielä arvosteluja"
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
    <Chart rawData={groupedReviews} field={"tasteCount"} name="Maku ★" type="bar" defaultColor={"gold"} dontSort={true} showPercentage={true}/>
    <Chart rawData={groupedReviews} field={"PQRCount"}  name="Hinta-laatu €" type="bar" defaultColor={"green"} dontSort={true} showPercentage={true}/>
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