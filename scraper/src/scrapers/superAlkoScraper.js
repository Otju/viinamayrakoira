//s-12 l-9 right

const cheerio = require('cheerio');
const got = require('got');

const foodieUrl = "https://m.viinarannasta.ee/range-of-products/"

const percentageStringToFloat = (string) => parseFloat(string.replace("%", "").replace(",", "."))

const getDrinkInfos = async (categoryNumber, categoryName) => {

  console.log(`Getting infos for ${categoryName} from SuperAlko`)

  const links = []

  const getPage = async (page) => {

    const response = await got(foodieUrl + categoryNumber)
    const $ = cheerio.load(response.body)
    $('.js-link-item').each((i, item) => {
      const link = $(item).attr("href")
      links.push(link)
    })
    const isNotLastPage = $('.js-load-more.btn.btn-default').attr("href")
    return isNotLastPage
  }

  let isNotLastPage = true
  for (let i = 1; isNotLastPage; i++) {
    isNotLastPage = await getPage(i)
  }
  const drinkInfos = []

  await Promise.all(links.map(async (link) => {
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
    if (category === "Muut viinit") {
      const isInNameOrDescription = (words) => {
        const inName = words.some(word => name.toLowerCase().includes(word))
        const inDesc = words.some(word => description.toLowerCase().includes(word))
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
      website: "foodie"
    }
    drinkInfos.push(drinkInfo)
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
    code: 5
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
    code: [12,26]
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
    code: [24,25,21]
  }
]

const getSuperAlko = async () => {
  const infos = []
  await Promise.all(foodieCategories.map(async (category) => {
    const infosForCategory = await getDrinkInfos(category.code, category.name)
    infos.push(...infosForCategory)
  }))
  return infos
}

module.exports = getFoodie