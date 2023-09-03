const getAlko = require("./alkoScraper")
const getKMarket = require("./kmarketScraper")
const getSKaupat = require("./skauppaScaper")

const scrapers = [getAlko, getSKaupat, getKMarket]

module.exports = scrapers
