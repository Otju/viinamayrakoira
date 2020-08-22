const { gql } = require('apollo-server')

const typeDefs = gql`
  type Drink {
    id: ID!
    name: String!
    producer: String
    ean: String
    productCode: String
    link: String!
    price: Float!
    description: String
    percentage: Float!
    imageLink: String
    category: String!
    size: Float!
    store: String!
  }

  input DrinkInput {
    name: String!
    producer: String
    ean: String
    productCode: String
    link: String!
    price: Float!
    description: String
    percentage: Float!
    imageLink: String
    category: String!
    size: Float!
    store: String!
  }

  type allDrinksOutPut {
    drinks: [Drink!]!,
    count: Int!
  }
  
  type Query {
    allDrinks(
      first: Int!, 
      offset: Int,
      store: [String!],
      name: String,
      minPrice: Float,
      maxPrice: Float
      minPercentage: Float,
      maxPercentage: Float,
      minSize: Float,
      maxSize: Float,
      category: [String!]
      sortBy: String
      ): allDrinksOutPut!
  }

  type Mutation {
    updateAllDrinks(drinks: [DrinkInput]): [Drink]
  }
`

module.exports = typeDefs