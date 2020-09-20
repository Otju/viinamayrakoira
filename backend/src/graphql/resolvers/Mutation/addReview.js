const Review = require('../../../models/Review')
const Drink = require('../../../models/Drink')

const addReview = async (root, args) => {

  const drink = await Drink.findById(args.review.drink)

  const review = await Review.create({ ...args.review })

  await drink.updateOne({ reviews: [...drink.reviews, review._id] })

  return review
}

module.exports = addReview