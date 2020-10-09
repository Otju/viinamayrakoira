const turnToNumber = (stringToChange) =>
  stringToChange ?
    parseFloat(stringToChange.replace(",", ".").replace(/[^0-9.]/g, ""))
    : undefined

const capitalizeFirst = string => {
  if (!string) {
    return null
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getPercentage = (string) => {
  const rawPercentage = string.match(/(\d+)?,?\.?\d+%/g)
  if (rawPercentage) {
    return percentage = turnToNumber(rawPercentage[0])
  }
  return null
}

const getSize = (string) => {
  let size

  const sizeMatchL = string.match(/\d?.?,?\d+l/g)
  if (sizeMatchL) {
    size = turnToNumber(sizeMatchL[0])
  }
  const sizeMatchCl = string.match(/\d?.?,?\d+cl/g)
  if (sizeMatchCl) {
    size = turnToNumber(sizeMatchCl[0]) / 100
  }

  return size
}

module.exports = { turnToNumber, capitalizeFirst, getSize, getPercentage }