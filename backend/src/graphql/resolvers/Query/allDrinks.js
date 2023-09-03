const Drink = require("../../../models/Drink")

const allDrinks = async (root, args) => {
  const sortByField = args.sortByField ? args.sortByField : "pricePerPortion"
  const sortDirection = args.sortByDescending ? -1 : 1
  let search = { isInSelection: true }
  if (args.store && args.store.length !== 0) {
    search.store = { $in: args.store }
  }
  if (args.category && args.category.length !== 0) {
    search.category = { $in: args.category }
  }
  if (args.minMax && args.minMax.length !== 0) {
    args.minMax.forEach((value) => {
      search[value.name] = {}
      if (value.min) {
        search[value.name].$gt = value.min
      }
      if (value.max) {
        search[value.name].$lt = value.max
      }
    })
  }
  if (args.name) {
    const drinks = await Drink.aggregate([
      {
        $search: {
          index: "drinks_index",
          text: {
            query: args.name,
            path: {
              wildcard: "*",
            },
          },
        },
      },
      { $match: search },
      { $skip: args.offset },
      { $limit: args.first },
      { $sort: { [sortByField]: sortDirection } },
    ])
    return drinks.map((drink) => ({ ...drink, id: drink._id }))
  } else {
    return await Drink.find(search)
      .skip(args.offset)
      .limit(args.first)
      .sort({ [sortByField]: sortDirection })
  }
}

module.exports = allDrinks
