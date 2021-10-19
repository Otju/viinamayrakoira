const Drink = require("../../../models/Drink")
const roundTo = require("round-to")
const { performance } = require("perf_hooks")
const { ForbiddenError } = require("apollo-server-lambda")
const { updateAllDrinkFields } = require("../utils")

const updateAllDrinks = async (root, args) => {
  if (!args.secret || args.secret !== process.env.SECRET) {
    throw new ForbiddenError("Only allowed in development-mode")
  }

  const startTime = performance.now()

  const storeNames = {
    alko: "Alko",
    foodie: "Smarket S-market S-ryhmä",
    kmarket: "Kmarket K-market K-ryhmä Kesko",
    eckeroLine: "Eckerö Line",
    tallink: "Tallink & Silja Line",
    superAlkoEesti: "Super Eesti Viro",
    superAlkoLatvia: "Super Latvia",
  }

  try {
    const drinksToSave = []
    let duplicateIDCount = 0
    args.drinks.forEach((drink) => {
      const idNumber = drink.productCode ? drink.productCode : drink.ean
      if (drink.percentage === 0) {
        return
      }
      const portionAmount = (drink.size * (drink.percentage / 100)) / 0.015201419
      const id = idNumber + drink.store
      if (drinksToSave.find((drink) => drink._id === id)) {
        duplicateIDCount++
      } else {
        drinksToSave.push({
          _id: id,
          pricePerLitre: roundTo(drink.price / drink.size, 2),
          portionAmount: roundTo(portionAmount, 2),
          pricePerPortion: roundTo(drink.price / portionAmount, 2),
          ...drink,
          category: drink.category.toLowerCase(),
          isInSelection: true,
          searchTermString:
            ["name", "producer", "store", "category"].map((field) => drink[field]).join(" ") +
            [
              { value: drink.percentage, unit: "%" },
              { value: drink.price, unit: "€" },
              { value: drink.size, unit: "l" },
              { value: drink.size * 100, unit: "cl" },
              { value: drink.size * 1000, unit: "ml" },
            ]
              .map(
                (item) =>
                  `${item.value}${item.unit} ${item.value.toString().replace(".", ",")}${item.unit}`
              )
              .join(" ") +
            storeNames[drink.store],
        })
      }
    })
    console.log(`Didn't add ${duplicateIDCount} items with duplicate id`)

    const getTime = () => roundTo(performance.now() - startTime, 0) / 1000

    await Drink.deleteMany({})

    const response = await Drink.insertMany(drinksToSave)

    console.log("INSERTED NEW", getTime())

    updateAllDrinkFields()

    console.log("UPDATED REVIEW SCORES", getTime())

    console.log("DRINKS UPDATED", response.length)
  } catch (error) {
    console.log(error.message)
    return error.message
  }
  if (process.env.SCRAPERMODE) {
    process.exit()
  }
}

module.exports = updateAllDrinks
