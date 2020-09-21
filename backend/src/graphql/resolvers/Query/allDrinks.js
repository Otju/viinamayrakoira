const Drink = require('../../../models/Drink')

const allDrinks = async (root, args) => {
  const sortByField = args.sortByField ? args.sortByField : "pricePerPortion"
  const sortDirection = args.sortByDescending ? -1 : 1
  let search = {isInSelection: true}
  let searchText = undefined
  if (args.name) {
    searchText = args.name
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
  let drinks
  let count
  if (sortByField === "relevance" && searchText) {
    drinks = await Drink.fuzzySearch(searchText, search).skip(args.offset).limit(args.first).populate("reviews")
    count = await Drink.fuzzySearch(searchText, search).countDocuments()
  } else {
    drinks = await Drink.find(search).skip(args.offset).limit(args.first).sort({ [sortByField]: sortDirection }).populate({ path: "reviews", options: { sort: {taste: 1} } })
    count = await Drink.find(search).countDocuments()
  }
  return { drinks, count }
}

module.exports = allDrinks