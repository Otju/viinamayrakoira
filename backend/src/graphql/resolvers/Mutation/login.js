const User = require('../../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { UserInputError } = require("apollo-server-lambda")

const login = async (root, args) => {
  const username = args.username
  const user = await User.findOne({ username })

  const credentialsRight = user && await bcrypt.compare(args.password, user.passwordHash)

  if (!credentialsRight) {
    throw new UserInputError("wrong credentials")
  }

  return { token: jwt.sign({ id: user.id }, process.env.JWT_SECRET), username, id: user.id }
}

module.exports = login