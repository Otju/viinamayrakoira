const Review = require('../../../models/Review')
const Drink = require('../../../models/Drink')
const { UserInputError, AuthenticationError } = require("apollo-server")

const addReview = async (root, args, context) => {

  if (!args.review || !args.review.taste || !args.review.priceQualityRatio) {
    throw new UserInputError("Missing taste and/or priceQualityRatio")
  }
  if (!context.currentUser) {
    throw new AuthenticationError("User not logged in")
  }

  const currentUser = context.currentUser

  const drink = await Drink.findById(args.review.drink).populate("reviews")

  const newReview = { ...args.review, userId: currentUser._id }

  let review
  let reviews

  const oldReview = drink.reviews.find(review => review.userId.toString() === currentUser._id.toString())
  if (oldReview) {
    await Review.updateOne(newReview)
    review = { ...newReview, id: oldReview.id, _id: oldReview.id, drink: oldReview.drink }
    reviews = drink.reviews.map(item => item.id === review.id ? review : item)
  } else {
    review = await (await Review.create(newReview)).toObject()
    review = { ...review, id: review._id, userId: currentUser._id }
    reviews = drink.reviews.concat(review)
  }

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

