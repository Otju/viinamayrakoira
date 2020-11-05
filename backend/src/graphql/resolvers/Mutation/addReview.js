const Review = require('../../../models/Review')
const Drink = require('../../../models/Drink')

const addReview = async (root, args, context) => {

  if (!args.review || !args.review.taste || !args.review.priceQualityRatio) {
    return
  }

  console.log(context.currentUser)

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
  const reviewIds = [...reviews.map(review => review._id)]
  const reviewCount = reviewIds.length
  const commentCount = reviews.filter(review => review.comment).length

  await drink.updateOne({ tasteAverage, priceQualityRatioAverage, reviewCount, commentCount, reviews: reviewIds })

  return { tasteAverage, priceQualityRatioAverage, reviewCount, commentCount, review }
}

module.exports = addReview