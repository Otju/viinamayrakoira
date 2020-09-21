const Review = require('../../../models/Review')
const Drink = require('../../../models/Drink')

const addReview = async (root, args) => {

  const drink = await Drink.findById(args.review.drink).populate("reviews")

  const review = await Review.create({ ...args.review })

  const reviews = drink.reviews.concat(review)

  const average = (field) => {
    const array = reviews.map(review => review[field])
    const avg = (array.reduce((acc, cur) => acc + cur, 0)) / array.length
    if (Number.isNaN(avg)) {
      return 0
    }
    return avg
  }

  const tasteAverage = average("taste")
  const priceQualityRatioAverage = average("priceQualityRatio")

  await drink.updateOne({ tasteAverage, priceQualityRatioAverage, reviews: [...drink.reviews.map(review => review._id), review._id] })

  return review
}

module.exports = addReview