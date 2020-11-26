const User = require("../../../models/User")
const { ApolloError, UserInputError } = require("apollo-server")
const deleteUser = async (root, args) => {

  const username = args.username
  const id = args.id

  const isTest = process.argv[2] === "test"

  if (!isTest) {
    throw new ApolloError("Can only delete users in test mode")
  }

  if (!username && !id) {
    throw new UserInputError("Missing both username and id")
  }

  let response
  if (id) {
    response = await User.deleteOne(id)

  } else {
    response = await User.deleteOne({ username })
  }

  if (response.deletedCount !== 1) {
    throw new ApolloError("Couldn't find user to delete")
  }

  return `removed user ${id || username}`
}

module.exports = deleteUser