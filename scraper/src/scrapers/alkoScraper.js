const fetch = require("node-fetch")
const XLSX = require("xlsx")
const roundTo = require("round-to")
const { turnToNumber } = require("../utils")
const fs = require("fs")
const axios = require("axios")

const xlsxUrl =
  "https://www.alko.fi/INTERSHOP/static/WFS/Alko-OnlineShop-Site/-/Alko-OnlineShop/fi_FI/Alkon%20Hinnasto%20Tekstitiedostona/alkon-hinnasto-tekstitiedostona.xlsx"

const getAlko = async () => {
  console.log("Getting drinks from Alko")
  const allDrinks = []
  const res = await axios.get(xlsxUrl, {
    responseType: "arraybuffer",
    headers: {
      Cookie:
        "visid_incap_2611631=CHJO7Oh/QHW6AqY3w9XGP0e09GQAAAAAQkIPAAAAAACAvb6uAVdenM9tXDwACfaCWnC4Ui69aiHB; incap_ses_1578_2611631=C9z6OmB0eVxo0OJ3Gi/mFUe09GQAAAAApvpAiR9Xk8xMQuJzUAcSTA==; sid=SVAd6_YGqWrg6JLy_RefN17GLq7cf5H4iMR6FTeS; nlbi_2611631=sg7ubVGBhE+buLeuwofcKAAAAADrFXcZCJCcICpEA5GbUH+A; pgid-Alko-OnlineShop-Site=ssRg63isRVBSRpIIYwMZ40rF0000ZFD7Rb2f; __Host-SecureSessionID-72402a682d006b7aa61f07164109dece=d0bf6c2d5155b1e72fd09e7347f807c7e8aba9e5e05057adb75da2330b5d1f5a; deviceType=might-be-mouse-device; global-message-closed=true",
    },
  })
  const workbook = XLSX.read(res.data, { type: "array" })
  const sheet = workbook.SheetNames[0]
  const alkoData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { range: 3 })
  alkoData.forEach((data) => {
    let type = data.Tyyppi
    if (type === "Jälkiruokaviinit, väkevöidyt ja muut viinit") {
      type = "Muut viinit"
    }
    if (type === "juomasekoitukset") {
      type = "Juomasekoitukset ja lonkerot"
    }
    if (type === "brandyt, Armanjakit ja Calvadosit") {
      type = "Brandyt Armanjakit ja Calvadosit"
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
      imageLink: `https://images.alko.fi/images/cs_srgb,f_auto,t_medium/cdn/${
        data.Numero
      }/${data.Nimi.replace(/ /g, "-")}`,
      category: type,
      size: roundTo(data.Hinta / data.Litrahinta, 2),
      store: "alko",
    }
    allDrinks.push(drinkInfo)
  })
  console.log("Got drinks from Alko")
  return allDrinks
}

module.exports = getAlko
