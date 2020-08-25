const Drink = require('../models/drink')
const roundTo = require('round-to')

const resolvers = {
  Query: {
    allDrinks: async (root, args) => {
      const sortByField = args.sortByField ? args.sortByField : "pricePerPortion"
      const sortDirection = args.sortByDescending ? -1 : 1
      let search = {}
      if (args.name) {
        let regex = "^"
        args.name.split(" ").forEach(part => regex += `(?=.*${part})`)
        regex += ".*$"
        search.name = { $regex: regex, $options: ["i", "x"] }
      }
      if (args.store && args.store.length !== 0) {
        search.store = { $in: args.store }
      }
      if (args.category && args.category.length !== 0) {
        search.category = { $in: args.category }
      }
      if (args.minMax && args.minMax.length !== 0) {
        args.minMax.forEach(value => {
          search[value.name] = {}
          if (value.min) {
            search[value.name].$gt = value.min
          }
          if (value.max) {
            search[value.name].$lt = value.max
          }
        })
      }
      const drinks = await Drink.find(search).skip(args.offset).limit(args.first).sort({ [sortByField]: sortDirection })
      const count = await Drink.find(search).countDocuments()
      return { drinks, count }
    }
  },
  Mutation: {
    updateAllDrinks: async (root, args) => {
      try {
        const drinksToSave = args.drinks.map(drink => {
          const idNumber = drink.productCode ? drink.productCode : drink.ean
          if (drink.percentage === 0) {
            return
          }
          const portionAmount = (drink.size * ((drink.percentage) / (100))) / 0.015201419
          return {
            _id: idNumber + drink.store,
            pricePerLitre: roundTo(drink.price / drink.size, 2),
            portionAmount: roundTo(portionAmount, 2),
            pricePerPortion: roundTo(drink.price / portionAmount, 2),
            ...drink,
            category: drink.category.toLowerCase()
          }
        })
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
  }
}

module.exports = resolvers