/* eslint-disable indent */
require("dotenv").config()
const { request } = require("graphql-request")
const scrapers = require("./scrapers")
const fs = require("fs")

const setAllDrinks = async () => {
  let allDrinks = []
  await Promise.all(
    scrapers.map(async (scraper) => {
      const drinksForScaper = await scraper()
      allDrinks.push(...drinksForScaper)
    })
  )

  const query = `
    mutation updateAllDrinks ($drinks: [DrinkInput], $secret: String!) {
      updateAllDrinks(drinks: $drinks, secret: $secret) { changed, new, deactivated }
    }
`

  const faultyDrinks = []

  const addFaultyDrink = (error, drink) => {
    faultyDrinks.push({ error, drink })
  }
  console.log("BEFORE FILTER", allDrinks.length)
  allDrinks = allDrinks
    .map((drink) => {
      const requiredFields = ["name", "price", "size", "store", "link", "category", "percentage"]
      let hasRequiredFields = true
      let missingField = "SOMETHIG MISSING"
      for (const field of requiredFields) {
        if (!drink[field]) {
          if (field !== "percentage") {
            missingField = `MISSING FIELD "${field}`
            hasRequiredFields = false
            break
          } else if (
            !(
              drink.name.toLowerCase().includes("alk") ||
              drink.name.toLowerCase().includes("0%") ||
              drink.name.toLowerCase().includes("0 %") ||
              drink.name.toLowerCase().includes("alcohol free") ||
              drink.category.toLowerCase() === "alkoholittomat" ||
              drink.name.toLowerCase().includes("non-alc") ||
              (drink.description && drink.description.toLowerCase().includes("alkoholit"))
            )
          ) {
            missingField = "FAULTY 0% DRINK"
            hasRequiredFields = false
            break
          } else {
            drink.percentage = 0
          }
        } else if (field === "percentage") {
          const percentage = drink.percentage
          const category = drink.category
          const percentageTooHigh = percentage >= 100
          const percentageTooHighForBeer =
            ["Oluet", "Siiderit"].includes(category) && percentage > 15
          const percentageTooHighForWine =
            [
              "Punaviinit",
              "Roseviinit",
              "Valkoviinit",
              "Kuohuviinit ja Samppanjat",
              "Muut viinit",
              "Hanapakkaukset",
              "Juomasekoitukset ja lonkerot",
            ].includes(category) && percentage > 25

          if (percentageTooHigh || percentageTooHighForBeer || percentageTooHighForWine) {
            missingField = "FAULTY PERCENTAGE"
            hasRequiredFields = false
            break
          }
        }
      }
      if (!drink.ean && !drink.productCode) {
        missingField = "MISSING EAN AND PRODUCTCODE"
        hasRequiredFields = false
      }
      if (!hasRequiredFields) {
        addFaultyDrink(missingField, drink)
        return null
      }
      return drink
    })
    .filter((drink) => drink)

  const variables = {
    drinks: allDrinks,
    secret: process.env.SECRET,
  }

  try {
    fs.writeFile(
      "faultyDrinks.json",
      `[${faultyDrinks.map((item) => JSON.stringify(item)).join(",")}]`,
      (error) => {
        if (error) throw error
        console.log(`${faultyDrinks.length} FAULTY DRINKS`)
      }
    )
    console.log("AFTER FILTER", allDrinks.length)
    await request("http://localhost:4000", query, variables)
    console.log(`ADDED ${allDrinks.length}`)
  } catch (error) {
    console.log("ERROR:", error.message.slice(0, 5000))
  }
}
setAllDrinks()
