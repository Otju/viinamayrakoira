//s-12 l-9 right
const cheerio = require('cheerio');
const got = require('got');
const percentageStringToFloat = require('../utils')

const superAlkoUrl = "https://m.viinarannasta.ee/"

const getDrinkInfos = async (categoryNumber, categoryName) => {

  console.log(`Getting infos for ${categoryName} from SuperAlko`)

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
      const nameDiv = $(item).find(".cell.col2")
      const name = $(nameDiv).text()
      const link = $(nameDiv).find("> span > a").attr("href")
      const price = $(item).find(".cell.col4" ).text()
      if (name && price) {
        console.log(name, price, link)
      }
    })
    /*
    let category = categoryName
    const productLink = foodieUrl + link
    const response = await got(productLink)
    const $ = cheerio.load(response.body)
    const name = $('#product-name').text()
    const producer = $('#product-subname').text()
    const ean = $('[itemprop=sku]').text()
    const size = Number($('.js-quantity').text().replace(/[^0-9.]/g, ""))
    const wholeNumberOfPrice = $('.whole-number ').text()
    const decimalsOfPrice = $('.decimal').text()
    const price = Number((`${wholeNumberOfPrice}.${decimalsOfPrice}`))
    const description = $('div[id=info] [itemprop=description]').first().text()
    const imageLink = $('img[class=product-image]').attr("src")
    let percentage
    name.split(" ").forEach((part, i) => {
      if (part.includes("%")) {
        let partToInt = percentageStringToFloat(part)
        if (Number.isNaN(partToInt)) {
          partToInt = percentageStringToFloat(name.split(" ")[i - 1])
        }
        percentage = partToInt
        return
      }
    })
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
      website: "superAlko"
    }
    drinkInfos.push(drinkInfo)
    */
  }))
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
  await Promise.all(superAlkoCategories.map(async (category) => {
    await Promise.all(category.code.map(async (code) => {
      const infosForCategory = await getDrinkInfos(code, category.name)
      //infos.push(...infosForCategory)
    }))
  }))
  return infos
}

module.exports = getSuperAlko