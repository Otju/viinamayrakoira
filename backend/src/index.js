require('dotenv').config()
const { ApolloServer } = require('apollo-server-lambda')

const server = new ApolloServer(serverOptions)

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  }
})

