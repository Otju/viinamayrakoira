const getFoodie = require("./foodieScraper")
const getAlko = require("./alkoScraper")
const getSuperAlko = require("./superAlkoScraper")

const scrapers = [getAlko, getSuperAlko, getFoodie]

module.exports = scrapers