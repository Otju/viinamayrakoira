import { gql } from '@apollo/client'

export const ALL_DRINKS = gql`
  query {
    allDrinks{
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
  }
`