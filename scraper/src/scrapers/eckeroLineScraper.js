const cheerio = require('cheerio');
const got = require('got');
const { turnToNumber } = require('../utils')
const roundTo = require('round-to')

const eckeroLineUrl = "https://www.eckeroline.fi/shopping?cat="

const getDrinkInfos = async (categoryNumber, categoryName) => {

  const firstPageLink = `${eckeroLineUrl}${categoryNumber}&product_list_limit=48`

  const getPageLinks = async () => {
    const pageLinks = [firstPageLink]
    const response = await got(firstPageLink)
    const $ = cheerio.load(response.body)
    const productAmounts = []
    $('.toolbar-number').each((i, item) => { productAmounts.push(turnToNumber($(item).text())) })
    let productAmount = Math.max(...productAmounts)
    for (let i = 2; i < 10; i++) {
      productAmount -= 48
      if (productAmount >= 0) {
        pageLinks.push(firstPageLink + `&p=${i}`)
      } else {
        break
      }
    }
    return pageLinks
  }
  const pageLinks = await getPageLinks()
  const links = []

  await Promise.all(pageLinks.map(async pageLink => {
    const response = await got(pageLink)
    const $ = cheerio.load(response.body)
    $(".product.photo.product-item-photo").each((i, item) => {
      const link = $(item).attr("href")
      const imageLink = $(item).find(".product-image-photo").attr("src")
      links.push({
        link,
        imageLink
      })
    })
  }))

  const drinkInfos = []
  await Promise.all(links.map(async (linkObject) => {
    const link = linkObject.link
    const imageLink = linkObject.imageLink
    let category = categoryName
    const response = await got(link)
    const $ = cheerio.load(response.body)
    const name = $('.base').text()
    let productCode
    let description
    $('.value').each((i, item) => {
      if (i === 1) {
        description = $(item).text()
      } else {
        productCode = $(item).text()
      }
    })
    const sizeRaw = $('td[data-th=Pakkauskoko]').text()
    const percentage = turnToNumber($('td[data-th=Alkoholi]').text())
    const price = roundTo(turnToNumber($(".price").text()-0.01),2)

    if (!sizeRaw.includes("cl")) {
      console.log("NOT CL")
    }
    if (sizeRaw.includes("x")) {
      const parts = sizeRaw.split(" ").map(part => turnToNumber(part))
      size = parts[0] * (parts[2] / 100)
    } else {
      size = turnToNumber(sizeRaw) / 100
    }

    if (category === "Muut viinit") {
      const isInName = (words) => {
        const inName = words.some(word => name.toLowerCase().includes(word))
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
      productCode,
      description,
      link,
      price,
      percentage,
      imageLink,
      category,
      size,
      store: "eckeroLine"
    }
    drinkInfos.push(drinkInfo)
  }))
  return drinkInfos
}

const categories = [
  {
    name: "Oluet",
    code: 93
  },
  {
    name: "Kuohuviinit ja Samppanjat",
    code: 96
  },
  /*
  {
    name: "Juomasekoitukset ja lonkerot",
    code: 1067
  },
  {
    name: "Juomasekoitukset ja lonkerot",
    code: 14018
  },
  {
    name: "Muut viinit",
    code: 1058
  }
  */
]

const getEckero = async () => {
  const infos = []
  console.log("Getting drinks from eckeroLine")
  await Promise.all(categories.map(async (category) => {
    const infosForCategory = await getDrinkInfos(category.code, category.name)
    infos.push(...infosForCategory)
    console.log(infos)
  }))
  console.log("Got drinks from eckeroLine")
  return infos
}

module.exports = getEckero