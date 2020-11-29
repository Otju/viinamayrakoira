const Review = require("../../../models/Review")
const { AuthenticationError } = require("apollo-server")

const getReviews = async (root, args, context) => {

  const drink = args.id

  if (!drink && (!context.currentUser || context.currentUser.role !== "admin")) {
    throw new AuthenticationError("Can't request all reviews if not admin")
  }

  return await Review.find(drink ? { drink } : {}).sort("comment").populate("user")
}

module.exports = getReviews