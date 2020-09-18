const Drink = require('../../../models/drink')

const bestDrinks = async (root, args) => {
  const search = args.store ? { store: args.store } : {}
  const drinks = []
  const getBestDrink = async (category, stickerText) => {
    let drink = await Drink.find(search).limit(1).sort({ [category]: 1 })
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