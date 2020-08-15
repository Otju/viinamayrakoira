const percentageStringToFloat = (string) => parseFloat(string.replace("%", "").replace(",", "."))

module.exports = { percentageStringToFloat }