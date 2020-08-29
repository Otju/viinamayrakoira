const axios = require('axios')
const { request, gql } = require('graphql-request')
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
      updateAllDrinks(drinks: $drinks) { id }
    }
`

  allDrinks = allDrinks.map(drink => {
    const requiredFields = ["name", "price", "size", "store", "link", "category", "percentage"]
    let hasRequiredFields = true
    requiredFields.forEach(field => {
      if (!drink[field]) {
        if (field !== "percentage" || !(drink.name.includes("alk")) || !(drink.name.includes("non-alc"))) {
          console.log(`${drink.link}} is missing field "${field}"`)
        }
        hasRequiredFields = false
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
  };

  try {
    const response = await request("http://localhost:4000/", query, variables)
    console.log(`Added ${response.updateAllDrinks.length} drinks to db`)
  }
  catch (error) {
    console.log("error")
  }
}
setAllDrinks()
