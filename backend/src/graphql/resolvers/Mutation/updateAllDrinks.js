const Drink = require('../../../models/Drink')
const Review = require('../../../models/Review')
const roundTo = require('round-to')
const { PerformanceObserver, performance } = require('perf_hooks')
const { insertMany } = require('../../../models/Drink')

const updateAllDrinks = async (root, args) => {
  const startTime = performance.now()

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
          category: drink.category.toLowerCase(),
          isInSelection: true,
          searchTermString: ["name", "producer", "store", "category"].map(field => drink[field]).join(" ")
            + [
              { value: drink.percentage, unit: "%" },
              { value: drink.price, unit: "€" },
              { value: drink.size, unit: "l" },
              { value: drink.size * 100, unit: "cl" },
              { value: drink.size * 1000, unit: "ml" }
            ].map(item => `${item.value}${item.unit} ${item.value.toString().replace(".", ",")}${item.unit}`).join(" ")
        })
      }
    })
    console.log(`Didn't add ${duplicateIDCount} items with duplicate id`)

    const getTime = () => roundTo(performance.now() - startTime, 0) / 1000

    let allDrinkIds = await Drink.find({}).select("_id")
    allDrinkIds = allDrinkIds.map(idObj => idObj.id)

    await Drink.updateMany({}, { isInSelection: false })
    const drinksNew = []
    const drinksUpdate = []

    console.log("SET TO FALSE", getTime())

    drinksToSave.forEach(drink => {
      if (allDrinkIds.includes(drink._id)) {
        drinksUpdate.push(drink)
      } else {
        drinksNew.push({ ...drink, reviews: [] })
      }
    })

    console.log("SORTED", getTime())

    let didntChange = 0
    await Promise.all(drinksUpdate.map(async (drink, i) => {
      const fieldsToCheck = ["name", "producer", "ean", "productCode", "link", "price", "description", "percentage", "imageLink", "category", "size", "searchTermString"]
      const dontUpdateMatches = fieldsToCheck.map(field => ({ [field]: drink[field] }))
      let updatedDrink = await Drink.updateOne(
        {
          _id: drink._id,
          $nor: [{ $and: dontUpdateMatches }]    //Slow as shit :C
        }, drink
      )
      if (updatedDrink.n === 0) {
        updatedDrink = await Drink.updateOne({ _id: drink._id }, { isInSelection: true })
        didntChange++
      }
      return updatedDrink
    }))

    console.log("UPDATED EXISTING", getTime())

    await Drink.insertMany(drinksNew)

    console.log("INSERTED NEW", getTime())

    const returnValues = {
      new: drinksNew.length,
      changed: drinksUpdate.length - didntChange,
      deactivated: allDrinkIds.length - drinksUpdate.length
    }

    console.log("DRINKS UPDATED", { ...returnValues, didntChange })

    return returnValues
  } catch (error) {
    console.log(error.message)
    return (error.message)
  }
}

module.exports = updateAllDrinks