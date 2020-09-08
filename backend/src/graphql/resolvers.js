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
    },
    statistics: async () => {

      const getValuesAndGroup = async (fieldToGroupBy) => {

        const rawValues = await Drink.aggregate(
          [{
            $group: {
              _id: fieldToGroupBy,
              count: { $sum: 1 },
              avgPrice: { $avg: "$price" },
              avgPricePerPortion: { $avg: "$pricePerPortion" },
              avgPercentage: { $avg: "$percentage" }
            }
          }
          ])
        return rawValues.map(item => {
          let group
          let groups = {}
          if (typeof item._id === "string") {
            group = item._id
          } else {
            groups = item._id
          }
          delete item._id
          Object.entries(item).map(([key, field]) => item[key] = roundTo(field, 2))
          return { group, groups, ...item }
        })
      }

      const drinksPerCategory = await getValuesAndGroup("$category")
      const drinksPerStore = await getValuesAndGroup("$store")
      const drinksPerStoreAndCategory = await getValuesAndGroup({ group1: '$store', group2: '$category' })
      drinkCount = drinksPerStore.reduce((acc, curr) => acc + curr.count, 0)
      return { drinkCount, drinksPerCategory, drinksPerStore, drinksPerStoreAndCategory }
    },
    bestDrinks: async (root, args) => {
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
  },
  Mutation: {
    updateAllDrinks: async (root, args) => {
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
  }
}

module.exports = resolvers