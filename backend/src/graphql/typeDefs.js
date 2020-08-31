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
    percentageIsGuess: Boolean
    imageLink: String
    category: String!
    size: Float!
    store: String!
    portionAmount: Float!
    pricePerPortion: Float!
    pricePerLitre: Float!
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
    percentageIsGuess: Boolean
    imageLink: String
    category: String!
    size: Float!
    store: String!
  }

  type groupAndCount {
    group: String!,
    count: Int!
  }

  type statisticsOutPut {
    drinkCount: Int
    drinksPerCategory: [groupAndCount!]
  }

  input minMax {
    name: String!,
    min: Int,
    max: Int
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
      minMax: [minMax!],
      category: [String!]
      sortByField: String,
      sortByDescending: Boolean
      ): allDrinksOutPut!

    statistics: statisticsOutPut!
  }

  type Mutation {
    updateAllDrinks(drinks: [DrinkInput]): [Drink]
  }
`

module.exports = typeDefs