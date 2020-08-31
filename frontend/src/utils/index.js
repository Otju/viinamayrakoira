import { stores, categories, searchTypes } from "./constants"
import { useWindowDimensions } from './hooks'

export { stores, categories, searchTypes, useWindowDimensions }

export const capitalizeFirst = inputString => {
  if (!inputString || typeof inputString !== "string") {
    return null
  }
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export const groupByN = (data, n) => {
  let result = []
  for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n))
  return result;
}



