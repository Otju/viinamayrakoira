import React from "react"

export const stores = [
  {
    name: "alko",
    color: "#E3333C",
    displayName: "Alko"
  },
  {
    name: "foodie",
    color: "#00A651",
    displayName: "S-ryhmä"
  },
  {
    name: "kmarket",
    color: "#F86800",
    displayName: "K-Market"
  },
  {
    name: "eckeroLine",
    color: "#00549F",
    displayName: "Eckerö Line"
  },
  {
    name: "superAlkoEesti",
    color: "#E67817",
    displayName: <>SuperAlko <img src={process.env.PUBLIC_URL + '/eestiflag.svg'} style={{ height: "1rem"}} alt="viinamayrakoira.svg" /></>
  },
  {
    name: "superAlkoLatvia",
    color: "#E67817",
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
    name: "ginit ja maustetut viinat",
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
]

export const colors = {
  lightGray: "#c4bcbc",
  darkGray: "#343A40"
}