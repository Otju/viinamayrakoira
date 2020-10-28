const Drink = require('../../../models/Drink')

const allDrinks = async (root, args) => {
  const sortByField = args.sortByField ? args.sortByField : "pricePerPortion"
  const sortDirection = args.sortByDescending ? -1 : 1
  let search = { isInSelection: true }
  let searchText = undefined
  if (args.name) {
    searchText = args.name
    let regex = "^"
    args.name.split(" ").forEach(part => regex += `(?=.*${part})`)
    regex += ".*$"
    search.searchTermString = { $regex: regex, $options: ["i", "x"] }
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
  let drinks
  drinks = await Drink.find(search).skip(args.offset).limit(args.first).sort({ [sortByField]: sortDirection })
  return drinks
}

module.exports = allDrinks