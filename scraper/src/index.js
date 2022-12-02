/* eslint-disable indent */
require("dotenv").config()
const { request } = require("graphql-request")
const scrapers = require("./scrapers")
const fs = require("fs")
const retry = require("async-retry")

const setAllDrinks = async () => {
  let allDrinks = []
  let onlyOneScraper
  switch (process.argv[2]) {
    case "alko":
      onlyOneScraper = 0
      break
    case "superAlko":
      onlyOneScraper = 1
      break
    case "foodie":
      onlyOneScraper = 2
      break
    case "kmarket":
      onlyOneScraper = 3
      break
    case "eckeroLine":
      onlyOneScraper = 4
      break
    case "tallink":
      onlyOneScraper = 5
      break
    default:
      break
  }
  if (onlyOneScraper || onlyOneScraper === 0) {
    const drinksForScaper = await scrapers[onlyOneScraper]()
    allDrinks.push(...drinksForScaper)
  } else {
    await Promise.all(
      scrapers.map(async (scraper) => {
        const drinksForScaper = await retry(
          async () => {
            return await scraper()
          },
          {
            retries: 3,
            onRetry: (error) => console.log(`one scraper crashed error: ${error}, retrying...`),
          }
        )
        allDrinks.push(...drinksForScaper)
      })
    )
  }

  const query = `
    mutation updateAllDrinks ($drinks: [DrinkInput], $secret: String!) {
      updateAllDrinks(drinks: $drinks, secret: $secret) { changed, new, deactivated }
    }
`

  const faultyDrinks = []

  const addFaultyDrink = (error, drink) => {
    faultyDrinks.push({ error, drink })
  }
  console.log("ENNEN FILTER", allDrinks.length)
  allDrinks = allDrinks
    .map((drink) => {
      const requiredFields = ["name", "price", "size", "store", "link", "category", "percentage"]
      let hasRequiredFields = true
      let missingField = "SOMETHIG MISSING"
      requiredFields.forEach((field) => {
        if (!drink[field]) {
          if (field !== "percentage") {
            missingField = `MISSING FIELD "${field}`
            hasRequiredFields = false
          } else if (
            !(
              drink.name.includes("alk") ||
              drink.name.includes("0%") ||
              drink.name.toLowerCase().includes("alcohol free") ||
              drink.category.toLowerCase() === "alkoholittomat" ||
              drink.name.includes("non-alc") ||
              drink.description.toLowerCase().includes("alkoholit")
            )
          ) {
            missingField = "FAULTY 0% DRINK"
            hasRequiredFields = false
          }
        } else if (drink[field] === "percentage") {
          const percentage = drink.percentage
          const category = drink.category
          if (
            percentage >= 100 ||
            (["Oluet", "Siiderit"].includes(category) && percentage > 15) ||
            ([
              "Punaviinit",
              "Roseviinit",
              "Valkoviinit",
              "Kuohuviinit ja Samppanjat",
              "Muut viinit",
              "Hanapakkaukset",
              "Juomasekoitukset ja lonkerot",
            ].includes(category) &&
              percentage > 25)
          ) {
            missingField = "FAULTY PERCENTAGE"
            console.log(percentage)
            hasRequiredFields = false
          }
        }
      })
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
    console.log("JÄLKEEN FILTER", allDrinks.length)
    await request("http://localhost:4000", query, variables)
    console.log(`ADDED ${allDrinks.length}`)
  } catch (error) {
    console.log("ERROR:", error.message.slice(0, 5000))
  }
}
setAllDrinks()
