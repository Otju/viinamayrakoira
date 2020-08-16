require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')

const Drink = require('./models/drink')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })

const typeDefs = gql`
  type Drink {
    id: ID!
    name: String!
    producer: String!
    ean: String
    productCode: String
    link: String!
    price: Float!
    description: String
    percentage: Float!
    imageLink: String
    category: String!
    size: Float!
    website: String!
  }

  input DrinkInput {
    name: String!
    producer: String!
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
  
  type Query {
    allDrinks: [Drink!]!
  }

  type Mutation {
    updateAllDrinks(drinks: [DrinkInput]): [Drink]
  }
`
const resolvers = {
  Query: {
    allDrinks: () => Drink.find({})
  },
  Mutation: {
    updateAllDrinks: async (root, args) => {
      const drinksToSave = args.drinks.map(drink => {

        const idNumber = drink.ean ? drink.ean : drink.productCode

        return {
          _id: idNumber + drink.store
        }
      }
      )
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

