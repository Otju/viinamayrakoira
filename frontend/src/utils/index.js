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
    name: "roseeviinit"
  },
  {
    name: "valkoviinit"
  },
  {
    name: "kuohuviinit ja samppanjat"
  },
  {
    name: "muut viinit"
  },
  {
    name: "oluet"
  },
  {
    name: "siiderit"
  },
  {
    name: "juomasekoitukset ja lonkerot"
  },
  {
    name: "vodkat ja viinat"
  },
  {
    name: "ginit ja muut viinat"
  },
  {
    name: "rommit"
  },
  {
    name: "konjakit"
  },
  {
    name: "brandyt, armanjakit ja calvadosit"
  },
  {
    name: "viskit"
  },
  {
    name: "liköörit ja katkerot"
  },
  {
    name: "alkoholittomat"
  }
]



