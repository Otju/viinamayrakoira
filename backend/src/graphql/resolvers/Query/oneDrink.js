const Drink = require("../../../models/Drink")

const oneDrink = async (root, args) => {
  return await Drink.findById(args.id).populate({ path: "reviews"})
}

module.exports = oneDrink