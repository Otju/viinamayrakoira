const Review = require("../../../models/Review")

const getReviews = async (root, args) => {

  const drink = args.id

  return await Review.find(drink ? { drink } : {}).sort("comment").populate("user")
}

module.exports = getReviews