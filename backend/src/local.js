const { ApolloServer } = require('apollo-server')
const serverOptions = require('./serverOptions')

const server = new ApolloServer(serverOptions)

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

