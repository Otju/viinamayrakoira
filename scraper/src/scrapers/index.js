const getFoodie = require("./foodieScraper")
const getAlko = require("./alkoScraper")
const getSuperAlko = require("./superAlkoScraper")
const getKmarket = require("./kmarketScraper")

const scrapers = [getAlko, getSuperAlko, getFoodie,getKmarket]

module.exports = scrapers