import React, { useEffect, useState } from "react"
import CommentList from "./CommentList"
import { useQuery } from "@apollo/client"
import { GET_REVIEWS } from "../../queries"
import DrinkInfo from "./DrinkInfo"
import ReviewForm from "./ReviewForm"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

const SingleDrink = ({ drink }) => {
  const result = useQuery(GET_REVIEWS, { variables: { id: drink.id } })
  const [reviews, setReviews] = useState(null)
  const [drinkState, setDrinkState] = useState(drink)

  useEffect(() => {
    if (result && !result.loading && result.data) {
      setReviews(result.data.getReviews)
    }
  }, [result])

  return (
    <div>
      <DrinkInfo drink={drinkState} showStoreButton={true} />
      <div style={{ padding: "20px 0px 20px" }}>
        {drinkState.description}
        <br />
      </div>
      <Tabs defaultActiveKey="reviews" transition={false}>
        <Tab eventKey="reviews" title="Kommentit">
          <CommentList reviews={reviews} drink={drinkState} />
        </Tab>
        <Tab eventKey="review" title="Arvostele">
          <ReviewForm
            {...{ drink, setReviews, reviews, setDrinkState }}
            refetchComments={result.refetch}
          />
        </Tab>
      </Tabs>
    </div>
  )
}

export default SingleDrink
