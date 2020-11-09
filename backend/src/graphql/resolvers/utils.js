const Drink = require("../../models/Drink")

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

  await Drink.updateOne({ _id: drinkId}, { tasteAverage, priceQualityRatioAverage, reviewCount, commentCount })

  return { tasteAverage, priceQualityRatioAverage, reviewCount, commentCount }
}

module.exports = updateDrinkFields