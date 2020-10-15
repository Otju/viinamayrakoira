import React from "react"

export const stores = [
  {
    name: "alko",
    color: "#E3333C",
    textColor: "white",
    displayName: "Alko"
  },
  {
    name: "foodie",
    color: "#00A651",
    displayName: "S-ryhmä"
  },
  {
    name: "kmarket",
    color: "#ff5500",
    displayName: "K-Market"
  },
  {
    name: "eckeroLine",
    color: "#00549F",
    textColor: "white",
    displayName: "Eckerö Line"
  },
  {
    name: "tallink",
    color: "#004152",
    textColor: "white",
    displayName: "Tallink & Silja Line"
  },
  {
    name: "superAlkoEesti",
    color: "#FF8800",
    displayName: <>SuperAlko <img src={process.env.PUBLIC_URL + '/eestiflag.svg'} style={{ height: "1rem"}} alt="viinamayrakoira.svg" /></>
  },
  {
    name: "superAlkoLatvia",
    color: "#FF8800",
    displayName: <>SuperAlko <img src={process.env.PUBLIC_URL + '/latviaflag.svg'} style={{ height: "1rem"}} alt="viinamayrakoira.svg" /></>
  }
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
    color: "#F4BB3E"
  },
  {
    name: "siiderit",
    color: "#6A9D25"
  },
  {
    name: "juomasekoitukset ja lonkerot",
    color: "#07a3f7"
  },
  {
    name: "vodkat ja viinat",
    color: "#c1eff7"
  },
  {
    name: "ginit ja maustetut viinat",
    color: "#89e5f5"
  },
  {
    name: "rommit",
    color: "#6b3303"
  },
  {
    name: "konjakit",
    color: "#E95D01"
  },
  {
    name: "brandyt armanjakit ja calvadosit",
    color: "#b34c09"
  },
  {
    name: "viskit",
    color: "#E77512"
  },
  {
    name: "liköörit ja katkerot",
    color: "#19572E"
  },
  {
    name: "alkoholittomat",
    color: "#cccac8"
  },
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
  {
    name: "tasteAverage",
    displayName: "maku",
    unit: "/5"
  },
  {
    name: "priceQualityRatioAverage",
    displayName: "hinta-laatu",
    unit: "/5"
  },
]

export const colors = {
  lightGray: "#c4bcbc",
  darkGray: "#343A40"
}