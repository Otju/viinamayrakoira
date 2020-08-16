const cheerio = require('cheerio');
const got = require('got');
const { turnToNumber, percentageStringToFloat } = require('../utils')

const superAlkoUrl = "https://m.viinarannasta.ee/"

const getDrinkInfos = async (categoryNumber, categoryName) => {

  const categoryLinks = []

  const getCategoryLinks = async () => {
    const response = await got(superAlkoUrl + "range-of-products/" + categoryNumber)
    const $ = cheerio.load(response.body)
    const div = $('.s-12.l-9.right')
    const somehint = div.find("div > h4 > span >").each((i, item) => {
      const link = $(item).attr("href")
      categoryLinks.push(link)
    })
  }

  await getCategoryLinks()

  const drinkInfos = []
  await Promise.all(categoryLinks.map(async (link) => {
    const response = await got(superAlkoUrl + link)
    const $ = cheerio.load(response.body)
    $('.row, .row2').each((i, item) => {
      const rawImageLink = $(item).find(".cell.col1.image-stack > a > img").attr("src")
      const nameDiv = $(item).find(".cell.col2")
      const name = $(nameDiv).text()
      const rawLink = $(nameDiv).find("> span > a").attr("href")
      const rawPrice = $(item).find(".cell.col4").text()
      if (name && rawPrice && rawLink) {
        const imageLink = rawImageLink.replace("-thumb", "")
        const link = superAlkoUrl + rawLink
        let category = categoryName
        const rawLinkParts = rawLink.split("/")
        const productCode = rawLinkParts[rawLinkParts.length - 1]
        const price = turnToNumber(rawPrice)

        let size
        let percentage
        name.split(" ").forEach((part) => {
          if (part.includes("%")) {
            percentage = turnToNumber(part)
          }
          if (part.includes("cl")) {
            if (part.includes("x")) {
              const partParts = part.split("x")
              size = turnToNumber(partParts[0]) * turnToNumber(partParts[1])
            } else {
              size = turnToNumber(part) / 100
            }
          }
          if (part.includes("1L")){
            size = 1
          }
        })

        const drinkInfo = {
          name,
          productCode,
          link,
          price,
          percentage,
          imageLink,
          category,
          size,
          store: "superAlko"
        }
        drinkInfos.push(drinkInfo)
      }
    })
  }))
  return drinkInfos
}


const superAlkoCategories = [
  {
    name: "Oluet",
    code: [1]
  },
  {
    name: "Siiderit",
    code: [2]
  },
  {
    name: "Juomasekoitukset ja lonkerot",
    code: [3, 32]
  },
  {
    name: "Konjakit",
    code: [7]
  },
  {
    name: "Ginit ja muut viinat",
    code: [6, 11, 39]
  },
  {
    name: "Rommit",
    code: [5]
  },
  {
    name: "Vodkat ja Viinat",
    code: [4]
  },
  {
    name: "Brandyt, Armanjakit ja Calvadosit",
    code: [8]
  },
  {
    name: "Viskit",
    code: [9]
  },
  {
    name: "Liköörit ja Katkerot",
    code: [10]
  },
  {
    name: "Kuohuviinit ja Samppanjat",
    code: [12, 26]
  },
  {
    name: "Punaviinit",
    code: [13]
  },
  {
    name: "Roseviinit",
    code: [15]
  },
  {
    name: "Valkoviinit",
    code: [14]
  },
  {
    name: "Muut viinit",
    code: [24, 25, 21]
  }
]

const getSuperAlko = async () => {
  const infos = []
  console.log("Getting drinks from SuperAlko")
  await Promise.all(superAlkoCategories.map(async (category) => {
    await Promise.all(category.code.map(async (code) => {
      const infosForCategory = await getDrinkInfos(code, category.name)
      infos.push(...infosForCategory)
    }))
  }))
  console.log("Got drinks from SuperAlko")
  return infos
}

module.exports = getSuperAlko