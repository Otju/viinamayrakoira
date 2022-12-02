const cheerio = require("cheerio")
const got = require("got")
const { getPercentage, getSize } = require("../utils")
const { turnToNumber } = require("../utils")

const mainUrl = "https://www.s-kaupat.fi"

const getDrinkInfos = async (category, categoryName) => {
  const links = []

  const getPage = async (page) => {
    let isNotLastPage = true
    const response = await got(`${mainUrl}/tuotteet/juomat-1/${category}?page=${page}`).catch(
      () => (isNotLastPage = false)
    )
    if (!isNotLastPage) return false
    const newLinks = []
    const $ = cheerio.load(response.body)
    $(".sc-ce9491ad-0").each((i, item) => {
      const link = $(item).attr("href")
      newLinks.push(link)
    })
    links.push(...newLinks)
    return true
  }

  let isNotLastPage = true
  for (let i = 1; isNotLastPage; i++) {
    isNotLastPage = await getPage(i)
  }
  const drinkInfos = []

  await Promise.all(
    links.map(async (link) => {
      let category = categoryName
      const productLink = mainUrl + link
      const response = await got(productLink)
      const $ = cheerio.load(response.body)
      const infoBody = $(".sc-6b22939d-2")
      const getFromInfoBody = (dataTestId) => {
        return infoBody.find(`[data-test-id='${dataTestId}']`)
      }
      const name = getFromInfoBody("product-name").text()
      const price = turnToNumber(getFromInfoBody("product-price__unitPrice").text())
      const pricePerLitre = turnToNumber(getFromInfoBody("comparison-price").text())
      const deposit = turnToNumber(getFromInfoBody("deposit-price").text()) || 0

      const moreInfoInfo = $(".sc-78c367c9-2")
        .toArray()
        .map((item) => $(item).text())
        .filter((item) => item)

      const moreInfoLabels = $(".sc-618c7756-3")
        .toArray()
        .map((item) => $(item).text())
        .filter((item) => item)

      moreInfoLabels.unshift("Tuotetiedot")

      const moreInfo = moreInfoLabels.map((label, i) => ({ label, info: moreInfoInfo[i] }))

      const getFromMoreInfo = (label) => {
        const item = moreInfo.find((item) => item.label === label)
        return item ? item.info : undefined
      }

      const description = getFromMoreInfo("Tuotetiedot")
      const producer = getFromMoreInfo("Valmistaja")
      const ean = getFromMoreInfo("EAN")
      const imageLink = `https://cdn.s-cloud.fi/v1/w384_q75/product/ean/${ean}_kuva1.jpg`
      const size = getSize(name, price) || (price - deposit) / pricePerLitre
      const percentage = getPercentage(name) || 0

      if (category === "Muut viinit") {
        const isInNameOrDescription = (words) => {
          const inName = words.some((word) => name && name.toLowerCase().includes(word))
          const inDesc = words.some(
            (word) => description && description.toLowerCase().includes(word)
          )
          return inName || inDesc
        }
        if (isInNameOrDescription(["red", "punaviini"])) {
          category = "Punaviinit"
        }
        if (isInNameOrDescription(["kuoh"])) {
          category = "Kuohuviinit ja Samppanjat"
        }
        if (isInNameOrDescription(["valko", "white"])) {
          category = "Valkoviinit"
        }
        if (isInNameOrDescription(["rosé", "rose"])) {
          category = "Roseeviinit"
        }
      }
      if (percentage <= 1) {
        category = "Alkoholittomat"
      }
      const drinkInfo = {
        name,
        producer,
        ean,
        link: productLink,
        price,
        description,
        percentage,
        imageLink,
        category,
        size,
        store: "foodie",
      }
      drinkInfos.push(drinkInfo)
    })
  )
  return drinkInfos
}

const foodieCategories = [
  {
    name: "Oluet",
    code: "oluet",
  },
  {
    name: "Siiderit",
    code: "siiderit",
  },
  {
    name: "Juomasekoitukset ja lonkerot",
    code: "lonkerot",
  },
  {
    name: "Juomasekoitukset ja lonkerot",
    code: "alkoholijuomasekoitukset",
  },
  {
    name: "Muut viinit",
    code: "viinit",
  },
]

const getFoodie = async () => {
  const infos = []
  console.log("Getting drinks from foodie")
  await Promise.all(
    foodieCategories.map(async (category) => {
      const infosForCategory = await getDrinkInfos(category.code, category.name)
      infos.push(...infosForCategory)
    })
  )
  console.log("Got drinks from foodie")
  return infos
}

module.exports = getFoodie
