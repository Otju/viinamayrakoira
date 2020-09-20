import { gql } from '@apollo/client'

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
        drinks{
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
        reviews{
          id
          username
          taste
          priceQualityRatio
          comment
        }
      }
      count
    }
  }
`

export const BEST_DRINKS = gql`
  query bestDrinks(
    $store: String
    ){
    bestDrinks(store: $store){
        id
        name
        producer
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
        reviews{
          id
          username
          taste
          priceQualityRatio
          comment
        }
    }
  }
`

export const STATISTICS = gql`
query {
  statistics{
    drinkCount
    drinksPerCategory{
      group
      count
      avgPrice
      avgPricePerPortion
      avgPercentage
    }
    drinksPerStore{
      group
      count
      avgPrice
      avgPricePerPortion
      avgPercentage
    }
    drinksPerStoreAndCategory{
      groups{
        group1
        group2
      }
      count
      avgPrice
      avgPricePerPortion
      avgPercentage
    }
  }
}
`

export const ADD_REVIEW = gql`
  mutation addReview($review: ReviewInput) {
    addReview(review: $review) {
      id
      username
      taste
      priceQualityRatio
      comment
    }
  }
`;
