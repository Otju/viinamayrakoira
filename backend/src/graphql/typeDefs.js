const { gql } = require('apollo-server-lambda')

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
    priceQualityRatioAverage: Float
    tasteAverage: Float
    commentCount: Int
    reviewCount: Int
  }

  type Review {
    id: String!
    drink: String!
    taste: Int
    priceQualityRatio: Int
    comment: String,
    user: User!
  }

  input ReviewInput {
    drink: String!
    taste: Int
    priceQualityRatio: Int
    comment: String
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

  type groups{
    group1: String!,
    group2: String!
  }

  type groupStats {
    group: String,
    groups: groups,
    count: Int!
    avgPrice: Float!
    avgPricePerPortion: Float!
    avgPercentage: Float!
  }

  type statisticsOutPut {
    drinkCount: Int
    drinksPerCategory: [groupStats!]
    drinksPerStore: [groupStats!]
    drinksPerStoreAndCategory: [groupStats!]
  }

  input minMax {
    name: String!,
    min: Int,
    max: Int
  }

  type updateAllDrinksOutPut{
    changed: Int,
    new: Int,
    deactivated: Int
  }

  type addReviewOutPut{
    review: Review!
    tasteAverage: Float!,
    priceQualityRatioAverage: Float!,
    reviewCount: Int!,
    commentCount: Int!
  }

  type deleteReviewOutPut{
    tasteAverage: Float!,
    priceQualityRatioAverage: Float!,
    reviewCount: Int!,
    commentCount: Int!
    id: ID!
  }


  type User {
    id: ID
    username: String!
    email: String
    dateCreated: String
  }

  type Token {
    token: String!
    username: String!
    id: String!
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
      ): [Drink!]!

    bestDrinks(store: String): [Drink!]!
    statistics: statisticsOutPut!
    oneDrink(id: String): Drink!
    getReviews(id: String): [Review!]!
  }

  type Mutation {
    updateAllDrinks(drinks: [DrinkInput]): updateAllDrinksOutPut
    addReview(review: ReviewInput): addReviewOutPut!
    deleteReview(reviewId: ID!, drinkId: String!): deleteReviewOutPut!
    createUser(
      username: String!
      password: String!
      email: String): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

module.exports = typeDefs