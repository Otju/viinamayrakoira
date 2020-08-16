const axios = require('axios')
const { request, gql } = require('graphql-request')

const getFoodie = require("./scrapers/foodieScraper")
const getAlko = require("./scrapers/alkoScraper")
const getSuperAlko = require("./scrapers/superAlkoScraper")

const setAllDrinks = async () => {
  let allDrinks = []
  const foodieDrinks = await getFoodie()
  const alkoDrinks = await getAlko()
  const superAlkodrinks = await getSuperAlko()
  allDrinks.push(...alkoDrinks)
  allDrinks.push(...foodieDrinks)
  allDrinks.push(...superAlkodrinks)

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
        console.log(`${drink.link}} is missing field "${field}"`)
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
