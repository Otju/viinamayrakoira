export const capitalizeFirst = inputString => {
  if (!inputString || typeof inputString !== "string") {
    return null
  }
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export const stores = [
  {
    name: "alko",
    color: "#E3333C"
  },
  {
    name: "foodie",
    color: "#00A651"
  },
  {
    name: "superAlko",
    color: "#E67817"
  },
]


