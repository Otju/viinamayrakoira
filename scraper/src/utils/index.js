const turnToNumber = (stringToChange) => Number(stringToChange.replace(",", ".").replace(/[^0-9.]/g, ""))

module.exports = { turnToNumber }