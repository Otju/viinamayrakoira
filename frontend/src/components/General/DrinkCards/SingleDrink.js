import React, { useEffect, useState } from 'react'
import CommentList from './CommentList'
import { useQuery } from '@apollo/client'
import { GET_REVIEWS } from '../../../queries'
import DrinkInfo from './DrinkInfo'
import ReviewForm from './ReviewForm'
import ReportModal from '../ReportModal'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const SingleDrink = ({ drink }) => {

  const result = useQuery(GET_REVIEWS, { variables: { id: drink.id } })
  const [reviews, setReviews] = useState(null)

  useEffect(() => {
    if (result && !result.loading) {
      setReviews(result.data.getReviews)
    }
  }, [result])

  return <div>
    <DrinkInfo drink={drink} showStoreButton={true} />
    <div>
      {drink.description}
      <br />
    </div>
    <ReportModal drinkId={drink.id}/>
    <Tabs defaultActiveKey="reviews" transition={false}>
      <Tab eventKey="reviews" title="Kommentit">
        <CommentList reviews={reviews} drink={drink} />
      </Tab>
      <Tab eventKey="review" title="Arvostele">
        <ReviewForm {...{ drink, reviews, setReviews}} refetchComments={result.refetch}/>
      </Tab>
    </Tabs>
  </div>
}

export default SingleDrink