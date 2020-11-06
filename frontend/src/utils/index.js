import { stores, categories, searchTypes, colors } from "./constants"
import { useWindowDimensions, useField, useUserInfo} from './hooks'

export { stores, categories, searchTypes, colors, useWindowDimensions, useField, useUserInfo}

export const capitalizeFirst = inputString => {
  if (!inputString || typeof inputString !== "string") {
    return null
  }
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}
export const round = (value) => Math.round((value + 0.00001) * 100) / 100

export const groupByN = (data, n) => {
  let result = []
  for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n))
  return result
}

export const average = (array, field) => {
  const avg = (array.reduce((acc, cur) => acc + cur[field], 0)) / array.length
  return Number.isNaN(avg) ? 0 : avg
}




