const Drink = require("../../../models/Drink")

const bestDrinks = async (root, args) => {
  const search = args.store ? { store: args.store } : {}
  const drinks = []
  const getBestDrink = async (category, stickerText, direction) => {
    let drink = await Drink.find({ ...search, isInSelection: true }).limit(1).sort({ [category]: direction, name: 1 })
    drink = drink[0]
    drink.sticker = stickerText
    drinks.push(drink)
  }
  await getBestDrink("pricePerPortion", "Halvin känni!", 1)
  await getBestDrink("tasteAverage", "Paras maku!", -1)
  await getBestDrink("priceQualityRatioAverage", "Paras hinta-laatu!", -1)
  return drinks
}


module.exports = bestDrinks