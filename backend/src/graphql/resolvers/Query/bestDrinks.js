const Drink = require('../../../models/Drink')
const Review = require('../../../models/Review')

const bestDrinks = async (root, args) => {
  const search = args.store ? { store: args.store } : {}
  const drinks = []
  const getBestDrink = async (category, stickerText) => {
    let drink = await Drink.find({ ...search, isInSelection: true }).limit(1).sort({ [category]: 1 }).populate("reviews")
    drink = drink[0]
    drink.sticker = stickerText
    drinks.push(drink)
  }
  await getBestDrink("pricePerPortion", "Halvin känni!")
  await getBestDrink("price", "Halvin juoma!")
  await getBestDrink("pricePerLitre", "Halvin litrahinta!")
  return drinks
}


module.exports = bestDrinks