const getFoodie = require("./foodieScraper")
const getAlko = require("./alkoScraper")
const getSuperAlko = require("./superAlkoScraper")
const getVikingLine = require("./vikingLineScraper")

const scrapers = [getAlko, getSuperAlko, getFoodie,getVikingLine]

module.exports = scrapers