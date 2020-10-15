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
      let imageLink
      imageLink = $(item).find(".product-image-photo").attr("src")
      links.push({
        link,
        imageLink
      })
    })
  }))

  const drinkInfos = []
  await Promise.all(links.map(async (linkObject) => {
    try {
      const link = linkObject.link
      const imageLink = linkObject.imageLink
      let category = categoryName
      let $
      const response = await got(link)
      $ = cheerio.load(response.body)
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

      if (!productCode && name === "Sierra Nevada Pale Ale 12-pack") {
        productCode = "37962"
      }

      const sizeRaw = $('td[data-th=Pakkauskoko]').text()
      let percentage = turnToNumber($('td[data-th=Alkoholi]').text())
      const price = roundTo(turnToNumber($(".price").text()) - 0.01, 2)

      let unitDivider = 100

      if (sizeRaw.includes("ml")) {
        unitDivider = 1000
      }

      if (sizeRaw.includes("x")) {
        const parts = sizeRaw.split(" ").map(part => turnToNumber(part))
        const sizeOfOne = parts[2] ? parts[2] : parts[1]
        size = parts[0] * (sizeOfOne / unitDivider)
      } else {
        size = turnToNumber(sizeRaw) / unitDivider
      }

      if (!size && link.includes("100cl")) {
        size = 1
      }

      if(name==="Vina Sol Torres"){
        size = 0.75
      }

      if (percentage <= 1) {
        category = "Alkoholittomat"
      }

      let percentageIsGuess = false

      if (!percentage) {
        percentageIsGuess = true
        percentage = 11.5
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
        store: "eckeroLine",
        percentageIsGuess
      }
      drinkInfos.push(drinkInfo)
    }
    catch (e) {
      console.log(linkObject.link, e.message)
    }
  }))
  return drinkInfos
}

const categories = [
  {
    name: "Oluet",
    code: [93]
  },
  {
    name: "Kuohuviinit ja Samppanjat",
    code: [96]
  },
  {
    name: "Siiderit",
    code: [105]
  },
  {
    name: "Juomasekoitukset ja lonkerot",
    code: [107]
  },
  {
    name: "Punaviinit",
    code: [98]
  },
  {
    name: "Valkoviinit",
    code: [99]
  },
  {
    name: "Roseeviinit",
    code: [101]
  },
  {
    name: "Alkoholittomat",
    code: [109]
  },
  {
    name: "Muut viinit",
    code: [95]
  },
  {
    name: "Liköörit ja Katkerot",
    code: [88, 89, 90, 114, 85, 86]
  },
  {
    name: "Konjakit",
    code: [73]
  },
  {
    name: "Brandyt Armanjakit ja Calvadosit",
    code: [75]
  },
  {
    name: "Viskit",
    code: [79]
  },
  {
    name: "Vodkat ja Viinat",
    code: [80]
  },
  {
    name: "Ginit ja maustetut viinat",
    code: [81,83, 84]
  },
  {
    name: "Rommit",
    code: [82]
  }
]

const getEckero = async () => {
  const infos = []
  console.log("Getting drinks from eckeroLine")
  await Promise.all(categories.map(async (category) => {
    await Promise.all(category.code.map(async (code) => {
      const infosForCategory = await getDrinkInfos(code, category.name)
      infos.push(...infosForCategory)
    }))
  }))
  console.log("Got drinks from eckeroLine")
  return infos
}

module.exports = getEckero