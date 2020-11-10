const Drink = require("../../models/Drink")
const Review = require("../../models/Review")

const updateDrinkFields = async (drinkId, reviews) => {

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

  await Drink.updateOne({ _id: drinkId }, { tasteAverage, priceQualityRatioAverage, reviewCount, commentCount })

  return { tasteAverage, priceQualityRatioAverage, reviewCount, commentCount }
}

const updateAllDrinkFields = async () => {

  const reviews = await Review.find({})

  await Drink.updateMany({}, { commentCount: 0, reviewCount: 0, tasteAverage: 0, priceQualityRatioAverage: 0 })

  const drinkIds = [...new Set(reviews.map(r => r.drink))]

  for (const drinkId of drinkIds) {
    const drinkReviews = reviews.filter(review => review.drink === drinkId)
    await updateDrinkFields(drinkId, drinkReviews)
  }
}

module.exports = { updateDrinkFields, updateAllDrinkFields }