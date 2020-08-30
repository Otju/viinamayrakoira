const getFoodie = require("./foodieScraper")
const getAlko = require("./alkoScraper")
const getSuperAlko = require("./superAlkoScraper")
const getKmarket = require("./kmarketScraper")
const getEckeroLine = require("./eckeroLineScraper")

const scrapers = [getAlko, getSuperAlko, getFoodie, getKmarket, getEckeroLine]

module.exports = scrapers