import { gql } from '@apollo/client'

export const ALL_DRINKS = gql`
  query allDrinks(
    $first: Int!
    $offset: Int,
    $name: String
    ){
    allDrinks(
      first: $first,
      offset: $offset,
      name: $name
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
      }
      count
    }
  }
`