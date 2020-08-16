const turnToNumber = (stringToChange) =>
  stringToChange ?
    Number(stringToChange.replace(",", ".").replace(/[^0-9.]/g, ""))
    : undefined


module.exports = { turnToNumber }