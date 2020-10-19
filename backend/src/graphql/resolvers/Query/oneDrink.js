const Drink = require('../../../models/Drink')

const oneDrink = async (root, args) => {
  return await Drink.findById(args.id)
}

module.exports = oneDrink