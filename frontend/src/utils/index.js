import { stores, categories, searchTypes } from "./constants"
import { useWindowDimensions } from './hooks'

export { stores, categories, searchTypes, useWindowDimensions }

export const capitalizeFirst = inputString => {
  if (!inputString || typeof inputString !== "string") {
    return null
  }
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}



