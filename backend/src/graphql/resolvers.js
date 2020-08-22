
const Drink = require('../models/drink')

const resolvers = {
  Query: {
    allDrinks: async (root, args) => {
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
      const drinks = await Drink.find(search).skip(args.offset).limit(args.first)
      const count = await Drink.find(search).countDocuments()
      return { drinks, count }
    }
  },
  Mutation: {
    updateAllDrinks: async (root, args) => {
      try {
        const drinksToSave = args.drinks.map(drink => {
          const idNumber = drink.productCode ? drink.productCode : drink.ean
          return {
            _id: idNumber + drink.store,
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

module.exports =  resolvers