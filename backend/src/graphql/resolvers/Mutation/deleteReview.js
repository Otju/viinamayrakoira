const Review = require('../../../models/Review')
const { UserInputError, AuthenticationError } = require("apollo-server")
const updateDrinkFields = require("../utils")

const deleteReview = async (root, args, context) => {

  const id = args.reviewId
  const drinkId = args.drinkId

  if (!id || !drinkId) {
    throw new UserInputError("Missing parameters")
  }

  if (!context.currentUser) {
    throw new AuthenticationError("User not logged in")
  }

  const response = await Review.deleteOne({ _id: id, user: context.currentUser._id })


  if (response.deletedCount === 0) {
    throw new AuthenticationError("Incorrect user (or review._id")
  }

  const reviews = await Review.find({ drink: drinkId})

  const updatedDrinkFields = await updateDrinkFields(drinkId, reviews)

  return { ...updatedDrinkFields, id}
}

module.exports = deleteReview

