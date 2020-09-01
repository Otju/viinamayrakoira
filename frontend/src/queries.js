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
      }
      count
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
    }
  }
}
`
