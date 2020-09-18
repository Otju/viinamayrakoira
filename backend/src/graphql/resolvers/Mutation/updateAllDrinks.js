const Drink = require('../../../models/drink')
const roundTo = require('round-to')

const updateAllDrinks =  async (root, args) => {
  try {
    const drinksToSave = []
    let duplicateIDCount = 0
    args.drinks.forEach(drink => {
      const idNumber = drink.productCode ? drink.productCode : drink.ean
      if (drink.percentage === 0) {
        return
      }
      const portionAmount = (drink.size * ((drink.percentage) / (100))) / 0.015201419
      const id = idNumber + drink.store
      if (drinksToSave.find(drink => drink._id === id)) {
        duplicateIDCount++
      } else {
        drinksToSave.push({
          _id: id,
          pricePerLitre: roundTo(drink.price / drink.size, 2),
          portionAmount: roundTo(portionAmount, 2),
          pricePerPortion: roundTo(drink.price / portionAmount, 2),
          ...drink,
          category: drink.category.toLowerCase()
        })
      }
    })
    console.log(`Didn't add ${duplicateIDCount} items with duplicate id`)
    const deleteRes = await Drink.deleteMany({})
    console.log(`deleted ${deleteRes.deletedCount} items from database`)
    const returnedDrinks = await Drink.insertMany(drinksToSave)
    console.log(`inserted ${returnedDrinks.length} items to the database`)
    return returnedDrinks
  } catch (error) {
    console.log(error.message)
    return (error.message)
  }
}

module.exports = updateAllDrinks