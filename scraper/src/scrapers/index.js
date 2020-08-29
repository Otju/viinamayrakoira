const getFoodie = require("./foodieScraper")
const getAlko = require("./alkoScraper")
const getSuperAlko = require("./superAlkoScraper")
const vikingLine = require("./vikingLineScraper")

const scrapers = [getAlko, getSuperAlko, getFoodie,vikingLine]

module.exports = scrapers