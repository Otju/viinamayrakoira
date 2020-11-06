require('dotenv').config()
const mongoose = require('mongoose')
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const jwt = require('jsonwebtoken')
const User = require('./models/User')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const mongoUrl = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })

const serverOptions = {
  typeDefs,
  resolvers,
  context: async ({ event, req }) => {
    let auth
    if (req) {
      auth = req.headers.authorization
    } else if (event) {
      auth = event.headers.Authorization
    }
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const MongoCurrentUser = await User.findById(decodedToken.id).populate('reviews')
      const { passwordHash, __v, ...currentUser } = MongoCurrentUser.toObject()
      return { currentUser }
    }
  }
}

module.exports = serverOptions


