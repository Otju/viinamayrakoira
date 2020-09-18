const Drink = require('../../../models/drink')
const roundTo = require('round-to')

const statistics = async () => {

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
}


module.exports = statistics