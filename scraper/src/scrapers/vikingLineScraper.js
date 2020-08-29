const fetch = require("node-fetch")
const XLSX = require('xlsx')
const roundTo = require('round-to')
const { turnToNumber, capitalizeFirst } = require('../utils')


const xlsxUrl = "https://www.alko.fi/INTERSHOP/static/WFS/Alko-OnlineShop-Site/-/Alko-OnlineShop/fi_FI/Alkon%20Hinnasto%20Tekstitiedostona/alkon-hinnasto-tekstitiedostona.xlsx"

const getAlko = async () => {
  console.log("Getting drinks from Alko")
  const allDrinks = []
  const alkoData = await fetch(xlsxUrl)
    .then(res => res.buffer())
    .then(buffer => {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheet = workbook.SheetNames[0];
      return XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { range: 3 })
    })
  alkoData.forEach(data => {
    let type = data.Tyyppi
    if (type === "Jälkiruokaviinit, väkevöidyt ja muut viinit") {
      type = "Muut viinit"
    } if (type === "juomasekoitukset") {
      type = "Juomasekoitukset ja lonkerot"
    }
   if (type === "kuohuviinit & samppanjat") {
    type = "kuohuviinit ja samppanjat"
  }
    if (type === "lahja- ja juomatarvikkeet") {
      return
    }
    if (!type) {
      type = "Ei tietoa"
    }


    const drinkInfo = {
      name: data.Nimi,
      producer: data.Valmistaja,
      productCode: data.Numero,
      ean: data.EAN,
      link: `https://www.alko.fi/tuotteet/${data.Numero}/`,
      price: turnToNumber(data.Hinta),
      description: data.Luonnehdinta,
      percentage: turnToNumber(data["Alkoholi-%"]),
      imageLink: `https://images.alko.fi/images/cs_srgb,f_auto,t_medium/cdn/${data.Numero}/${data.Nimi.replace(/ /g, "-")}`,
      category: type,
      size: roundTo((data.Hinta) / data.Litrahinta, 2),
      store: "alko"
    }
    allDrinks.push(drinkInfo)
  })
  console.log("Got drinks from Alko")
  return allDrinks
}
module.exports = getAlko