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
    await Promise.all(scrapers.map(async (scraper) => {
      const drinksForScaper = await retry(async () => {
        return await scraper()
      }, {
        retries: 3,
        onRetry: (error) => console.log(`one scraper crashed error: ${error}, retrying...`)
      })
      allDrinks.push(...drinksForScaper)
    }))
  }

  const query = `
    mutation updateAllDrinks ($drinks: [DrinkInput]) {
      updateAllDrinks(drinks: $drinks) { changed, new, deactivated }
    }
`

  const faultyDrinks = []

  const addFaultyDrink = (error, drink) => {
    faultyDrinks.push({ error, drink })
  }

  allDrinks = allDrinks.map(drink => {
    const requiredFields = ["name", "price", "size", "store", "link", "category", "percentage"]
    let hasRequiredFields = true
    requiredFields.forEach(field => {
      if (!drink[field]) {
        if (field !== "percentage" && (!(drink.name.includes("alk")) || drink.category !== "alkoholittomat" || !(drink.name.includes("non-alc")))) {
          addFaultyDrink(`MISSING FIELD "${field}`, drink)
        }
        hasRequiredFields = false
      } else if (field === "percentage") {
        const percentage = drink[field]
        const category = drink.category
        if (percentage >= 100 || (["Oluet", "Siiderit"].includes(category) && percentage > 15)
          || (["Punaviinit", "Roseviinit", "Valkoviinit", "Kuohuviinit ja Samppanjat", "Muut viinit", "Hanapakkaukset", "Juomasekoitukset ja lonkerot"].includes(category) && percentage > 25)) {
          addFaultyDrink("FAULTY PERCENTAGE", drink)
          hasRequiredFields = false
        }
      }
    })
    if (!drink.ean && !drink.productCode) {
      addFaultyDrink("MISSING EAN AND PRODUCTCODE", drink)
      hasRequiredFields = false
    }
    if (!hasRequiredFields) {
      return null
    }
    return drink
  }).filter(Boolean)

  const variables = {
    drinks: allDrinks
  }

  try {
    fs.writeFile("faultyDrinks.json", faultyDrinks.map(item => JSON.stringify(item)).join(","), (error) => {
      if (error) throw error
      console.log(`${faultyDrinks.length} FAULTY DRINKS`)
    })
    await request("http://localhost:4000/", query, variables)
    console.log(`ADDED ${allDrinks.length}`)
  }
  catch (error) {
    console.log("ERROR:", error.message.slice(0, 500))
  }
}
setAllDrinks()
