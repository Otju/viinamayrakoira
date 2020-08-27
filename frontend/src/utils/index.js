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

export const categories = [
  {
    name: "punaviinit",
    color: "#550000"
  },
  {
    name: "roseeviinit",
    color: "#CD5E92"
  },
  {
    name: "valkoviinit",
    color: "#eef5c6"
  },
  {
    name: "kuohuviinit ja samppanjat",
    color: "#D9DA4B"
  },
  {
    name: "muut viinit",
    color: "#9E1717"
  },
  {
    name: "oluet",
    color: "#6F3D1F"
  },
  {
    name: "siiderit",
    color: ""
  },
  {
    name: "juomasekoitukset ja lonkerot",
    color: ""
  },
  {
    name: "vodkat ja viinat",
    color: ""
  },
  {
    name: "ginit ja muut viinat",
    color: ""
  },
  {
    name: "rommit",
    color: ""
  },
  {
    name: "konjakit",
    color: ""
  },
  {
    name: "brandyt, armanjakit ja calvadosit",
    color: ""
  },
  {
    name: "viskit",
    color: ""
  },
  {
    name: "liköörit ja katkerot",
    color: ""
  },
  {
    name: "alkoholittomat",
    color: ""
  }
]

export const searchTypes = [
  {
    name: "price",
    displayName: "hinta",
    unit: "€"
  },
  {
    name: "percentage",
    displayName: "vahvuus",
    unit: "%"
  },
  {
    name: "size",
    displayName: "tilavuus",
    unit: "l"
  },
  {
    name: "pricePerLitre",
    displayName: "litrahinta",
    unit: "€/l"
  },
  {
    name: "portionAmount",
    displayName: "annosmäärä",
    unit: "annosta"
  },
  {
    name: "pricePerPortion",
    displayName: "annoshinta",
    unit: "€/annos"
  },
]



