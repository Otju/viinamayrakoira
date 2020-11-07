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
  const rawPercentage = string.match(/(\d+)?,?\.?\d+(|\s+)%/g)
  if (rawPercentage) {
    return percentage = turnToNumber(rawPercentage[0])
  }
  return null
}

const getSize = (string) => {

  let size
  string = string.toLowerCase()

  const multiplier = string.match(/\d+x/g) || string.match(/\d+-pack/g)

  const sizeMatchL = string.match(/\d?\.?,?\d+(|\s+)l(\s|$)/g)
  if (sizeMatchL) {
    size = turnToNumber(sizeMatchL[0])
  }
  const sizeMatchCl = string.match(/\d?\.?,?\d+(|\s+)cl(\s|$)/g)
  if (sizeMatchCl) {
    size = turnToNumber(sizeMatchCl[0]) / 100
  }
  const sizeMatchMl = string.match(/\d?\.?,?\d+(|\s+)ml(\s|$)/g)
  if (sizeMatchMl) {
    size = turnToNumber(sizeMatchMl[0]) / 1000
  }

  if (multiplier) {
    size = size * turnToNumber(multiplier[0])
  }

  return size
}

module.exports = { turnToNumber, capitalizeFirst, getSize, getPercentage }