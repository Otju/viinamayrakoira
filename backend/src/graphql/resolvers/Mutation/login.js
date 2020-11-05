const User = require('../../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { UserInputError } = require("apollo-server-lambda")

const login = async (root, args) => {
  const user = await User.findOne({ username: args.username })
  
  const credentialsRight = user && await bcrypt.compare(args.password, user.passwordHash)

  if (!credentialsRight) {
    throw new UserInputError("wrong credentials")
  }

  return { token: jwt.sign({ id: user.id }, process.env.JWT_SECRET) }
}

module.exports = login