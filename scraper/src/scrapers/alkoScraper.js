const fetch = require("node-fetch")
const XLSX = require('xlsx')
const roundTo = require('round-to')


const xlsxUrl = "https://www.alko.fi/INTERSHOP/static/WFS/Alko-OnlineShop-Site/-/Alko-OnlineShop/fi_FI/Alkon%20Hinnasto%20Tekstitiedostona/alkon-hinnasto-tekstitiedostona.xlsx"

const getAlko = async () => {
  const allDrinks = []
  const alkoData = await fetch(xlsxUrl)
    .then(res => res.buffer())
    .then(buffer => {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheet = workbook.SheetNames[0];
      return XLSX.utils.sheet_to_json(workbook.Sheets[sheet],{range:3})
    })
    alkoData.forEach(data => {
      const drinkInfo = {
        name: data.Nimi,
        producer: data.Valmistaja,
        ean: data.EAN,
        link: `https://www.alko.fi/tuotteet/${data.Numero}/Gaja-Barbaresco-2014/`,
        price: data.Hinta,
        description: data.Luonnehdinta,
        percentage: data["Alkoholi-%"],
        imageLink: `https://images.alko.fi/images/cs_srgb,f_auto,t_medium/cdn/${data.Numero}/${data.Nimi.replace(/ /g, "-")}`,
        category: data.Tyyppi,
        size: roundTo((data.Hinta)/data.Litrahinta,2),
        website: "alko"
      }
      allDrinks.push(drinkInfo)
    })
    return allDrinks
}
module.exports = getAlko