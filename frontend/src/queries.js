import { gql } from "@apollo/client"

const fragments = {
  drinkFields: gql`
    fragment DrinkFields on Drink {
      id
      name
      producer
      ean
      productCode
      link
      price
      description
      percentage
      imageLink
      category
      size
      store
      portionAmount
      pricePerPortion
      pricePerLitre
      percentageIsGuess
      priceQualityRatioAverage
      tasteAverage
      reviewCount
      commentCount
    }
  `,
  reviewsInfo: gql`
  fragment ReviewsInfo on ReviewOutPut {
    tasteAverage
    priceQualityRatioAverage
    reviewCount
    commentCount
  }
  `,
  reviewFields: gql`
  fragment ReviewFields on Review {
    id
    drink
    taste
    priceQualityRatio
    comment
    user{
      id
      username
    }
  }
  `,
  statisticsFields: gql`
  fragment StatisticsFields on groupStats {
    count
    avgPrice
    avgPricePerPortion
    avgPercentage
    }
  `
}


export const ALL_DRINKS = gql`
query allDrinks(
  $first: Int!
  $offset: Int,
  $name: String,
  $store: [String!]
  $category: [String!]
  $sortByField: String
  $sortByDescending: Boolean
  $minMax: [minMax!]
  ){
  allDrinks(
    first: $first,
    offset: $offset,
    name: $name,
    store: $store,
    category: $category,
    sortByField: $sortByField,
    sortByDescending: $sortByDescending,
    minMax: $minMax
  ){
    ...DrinkFields
  }
}
${fragments.drinkFields}
`

export const BEST_DRINKS = gql`
query bestDrinks(
  $store: String){
  bestDrinks(store: $store){
      ...DrinkFields
  }
}
${fragments.drinkFields}
`

export const STATISTICS = gql`
query {
  statistics{
    drinkCount
    drinksPerCategory{
      group
      ...StatisticsFields
    }
    drinksPerStore{
      group
      ...StatisticsFields
    }
    drinksPerStoreAndCategory{
      groups{
        group1
        group2
      }
      ...StatisticsFields
    }
  }
}
${fragments.statisticsFields}
`

export const GET_REVIEWS = gql`
query getReviews($id: String) {
  getReviews(id: $id) {
    ...ReviewFields
    usersThatLiked
    likes
  }
} 
${fragments.reviewFields}
`

export const ADD_REVIEW = gql`
mutation addReview($review: ReviewInput) {
  addReview(review: $review) {
    review{
      ...ReviewFields
    }
    ...ReviewsInfo
  }
}
${fragments.reviewFields}
${fragments.reviewsInfo}
`


export const DELETE_REVIEW = gql`
mutation deleteReview($reviewId: ID!, $drinkId: String!) {
  deleteReview(reviewId: $reviewId, drinkId: $drinkId){
    ...ReviewsInfo
    id
  }
}
${fragments.reviewsInfo}
`


export const ONE_DRINK = gql`
query oneDrink($id: String!){
  oneDrink(id: $id)
  {
      ...DrinkFields
  }
}
${fragments.drinkFields}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)  {
    token
    username
    id
  }
}
`

export const CREATE_USER = gql`
mutation createUser($username: String!, $password: String!, $email: String!) {
  createUser(username: $username, password: $password, email: $email)  {
    id
  }
}
`

export const LIKE = gql`
mutation likeReview($id: ID!) {
  likeReview(id: $id)  {
    id
    likes
    unLiked
  }
}
`

export const REPORT = gql`
mutation report($content: String!, $subject: String!) {
  report(content: $content, subject: $subject)
}
`

