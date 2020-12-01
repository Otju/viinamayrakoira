const turnToNumber = (stringToChange) =>
  stringToChange ?
    parseFloat(stringToChange.replace(",", ".").replace(/[^0-9.]/g, ""))
    : undefined

const capitalizeFirst = string => {
  if (!string) {
    return null
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const getPercentage = (string) => {
  const rawPercentage = string.match(/(\d+)?,?\.?\d+(|\s+)%/g)
  if (rawPercentage) {
    let percentage = turnToNumber(rawPercentage[0])

    if ((percentage >= 100 || percentage < 0) && rawPercentage[1]) {
      percentage = turnToNumber(rawPercentage[1])
    }

    return percentage
  }
  return null
}

const getSize = (string, price) => {

  let size
  string = string.toLowerCase()

  let multiplier = string.match(/\d+(x|\*)\d/g) || string.match(/x\d+/g) || string.match(/\d+-pac/g)

  if (multiplier && multiplier[0]) {
    multiplier = multiplier[0]
    if (multiplier.match(/\d+(x|\*)\d/g)) {
      multiplier = multiplier.slice(0, -1)
    }
  }

  let sizeMatch = string.match(/\d?\.?,?\d+(|\s+)-?(l|cl|ml)(\s|-|x|\+|$)/g)

  if (sizeMatch && sizeMatch[0]) {

    sizeMatch = sizeMatch[0]

    if (sizeMatch.includes("-")) {
      sizeMatch = sizeMatch.replace("0", "0.")
    }
    size = turnToNumber(sizeMatch.split("l")[0])

    if (sizeMatch.includes("cl")) {
      size = size / 100
    } else if (sizeMatch.includes("ml")) {
      size = size / 1000
    }

  } else {
    if (string.includes("75")) {
      size = 0.75
    }
  }

  if (multiplier) {
    const multiplierNumber = turnToNumber(multiplier)
    if (!price || multiplierNumber * 0.6 < price) {
      size = size * multiplierNumber
    }
  }

  return size
}

module.exports = { turnToNumber, capitalizeFirst, getSize, getPercentage }