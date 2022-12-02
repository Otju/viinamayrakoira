const fs = require("fs")

const getFoodie = require("./foodieScraper")
const getAlko = require("./alkoScraper")

const getFromOldData = async () => {
  const oldDrinks = JSON.parse(fs.readFileSync("./data/oldDrinks.json"))
  const drinks = JSON.parse(fs.readFileSync("./data/drinks.json"))
  const allDrinks = [...oldDrinks, ...drinks]
  const filtered = allDrinks.filter((drink) => drink.store !== "alko" && drink.store !== "foodie")
  return filtered.map((drink) => {
    if (drink.store === "kmarket") {
      const parts = drink.link.split("-")
      const lastPart = parts[parts.length - 1]
      drink.ean = lastPart
    }
    return drink
  })
}

const scrapers = [getAlko, getFoodie, getFromOldData]

module.exports = scrapers
