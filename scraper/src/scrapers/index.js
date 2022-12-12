const getFoodie = require("./foodieScraper")
const getAlko = require("./alkoScraper")
const getKMarket = require("./kmarketScraper")

const scrapers = [getAlko, getFoodie, getKMarket]

module.exports = scrapers
