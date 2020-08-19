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
      category: String
      ): allDrinksOutPut!
  }

  type Mutation {
    updateAllDrinks(drinks: [DrinkInput]): [Drink]
  }
`
const resolvers = {
  Query: {
    allDrinks: async (root, args) => {
      let search = {}
      if (args.name) {
        let regex = "^"
        args.name.split(" ").forEach(part => regex += `(?=.*${part})`)
        regex += ".*$"
        search.name = { $regex: regex, $options: ["i", "x"] }
      }
      if (args.store && args.store.length!==0) {
        search.store = { $in: args.store }
      }
      const drinks = await Drink.find(search).skip(args.offset).limit(args.first)
      const count = await Drink.find(search).countDocuments()
      return { drinks, count }
    }
  },
  Mutation: {
    updateAllDrinks: async (root, args) => {
      try {
        const drinksToSave = args.drinks.map(drink => {
          const idNumber = drink.productCode ? drink.productCode : drink.ean
          return {
            _id: idNumber + drink.store,
            ...drink
          }
        })
        const deleteRes = await Drink.deleteMany({})
        console.log(`deleted ${deleteRes.deletedCount} items from database`)
        const returnedDrinks = await Drink.insertMany(drinksToSave)
        console.log(`inserted ${returnedDrinks.length} items to the database`)
        return returnedDrinks
      } catch (error) {
        console.log(error.message)
        return (error.message)
      }

    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

