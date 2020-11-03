const axios = require('axios')
const { request } = require('graphql-request')
const scrapers = require('./scrapers')

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
  if (onlyOneScraper !== undefined) {
    const drinksForScaper = await scrapers[onlyOneScraper]()
    allDrinks.push(...drinksForScaper)
  } else {
    await Promise.all(scrapers.map(async (scraper) => {
      const drinksForScaper = await scraper()
      allDrinks.push(...drinksForScaper)
    }))
  }

  const query = `
    mutation updateAllDrinks ($drinks: [DrinkInput]) {
      updateAllDrinks(drinks: $drinks) { changed, new, deactivated }
    }
`

  allDrinks = allDrinks.map(drink => {
    const requiredFields = ["name", "price", "size", "store", "link", "category", "percentage"]
    let hasRequiredFields = true
    requiredFields.forEach(field => {
      if (!drink[field]) {
        if (field !== "percentage" && (!(drink.name.includes("alk")) || drink.category!=="alkoholittomat" || !(drink.name.includes("non-alc")))) {
          console.log(`${drink.link}} is missing field "${field}"`)
        }
        hasRequiredFields = false
      } else if (field === "percentage") {
        const percentage = drink[field]
        const category = drink.category
        if (percentage >= 100 || (["Oluet", "Siiderit"].includes(category) && percentage > 15)
          || (["Punaviinit", "Roseviinit", "Valkoviinit", "Kuohuviinit ja Samppanjat", "Muut viinit", "Hanapakkaukset", "Juomasekoitukset ja lonkerot"].includes(category) && percentage > 25)) {
          console.log(`${drink.link} FAULTY PERCENTAGE(${percentage})`)
        }
      }
    })
    if (!drink.ean && !drink.productCode) {
      console.log(`${drink.link} is missing field EAN and ProductCode`)
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
    const response = await request("http://localhost:4000/", query, variables)
    console.log(response)
    console.log(`Changed ${response.updateAllDrinks.changed} drinks`)
    console.log(`Added ${response.updateAllDrinks.new} new drinks`)
    console.log(`${response.updateAllDrinks.deactivated} drinks are deactivated`)
  }
  catch (error) {
    console.log("ERROR:", error.message.slice(0, 500))
  }
}
setAllDrinks()
