const User = require("../../../models/User")
const Review = require("../../../models/Review")
const { ApolloError, UserInputError } = require("apollo-server")
const deleteUser = async (root, args) => {

  const username = args.username
  let id = args.id

  const isTest = process.argv[2] === "test"

  if (!isTest) {
    throw new ApolloError("Can only delete users in test mode")
  }

  if (!username && !id) {
    throw new UserInputError("Missing both username and id")
  }

  if (!id) {
    const data = await User.find({ username })
    id = data[0]._id
  }
  const response = await User.deleteOne({ _id: id })

  if (response.deletedCount !== 1) {
    throw new ApolloError("Couldn't find user to delete")
  }

  await Review.deleteMany({ user: id })

  return `removed user ${id || username}`
}

module.exports = deleteUser