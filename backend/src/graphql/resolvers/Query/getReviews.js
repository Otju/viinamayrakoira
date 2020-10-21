const Review = require('../../../models/Review')

const getReviews = async (root, args) => {
  return await Review.find({ drink: args.id }).sort("comment")
}

module.exports = getReviews