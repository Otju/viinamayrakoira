import React, { useEffect, useState } from "react"
import Chart from "../../StatisticsPage/Chart"
import ListGroup from "react-bootstrap/ListGroup"
import { round } from "../../../utils"
import Comment from "./Comment"
import StarReview from "./StarReview"

const CommentList = ({ reviews, drink }) => {

  const [notSorted, setNotSorted] = useState(true)
  const [comments, setComments] = useState([])

  useEffect(() => {
    if ((!comments || comments.length === 0) && reviews && reviews.length > 0) {
      setComments(reviews?.filter((item) => item.comment))
    }
  }, [reviews])

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

  if (notSorted) {
    if (comments && comments.length > 0) {
      setComments(comments.sort((a, b) => b.likes - a.likes))
      setNotSorted(false)
    }
  }

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
        {comments && comments.length > 0
          ? comments.map(review => <Comment review={review} key={review.id} />)
          : "Ei vielä kommentteja"}
      </ListGroup>
    </div>
  </div>
}

export default CommentList