const { ApolloServer } = require("apollo-server")
const serverOptions = require("./serverOptions")

const server = new ApolloServer(serverOptions)

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
