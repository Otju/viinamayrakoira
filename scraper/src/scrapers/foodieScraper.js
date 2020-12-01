const cheerio = require("cheerio")
const got = require("got")
const { getPercentage, getSize } = require("../utils")

const foodieUrl = "https://www.foodie.fi"

const getDrinkInfos = async (categoryNumber, categoryName) => {

  const links = []

  const getPage = async (page) => {

    const response = await got(foodieUrl + "/products/" + categoryNumber + "/page/" + page)
    const $ = cheerio.load(response.body)
    $(".js-link-item").each((i, item) => {
      const link = $(item).attr("href")
      links.push(link)
    })
    const isNotLastPage = $(".js-load-more.btn.btn-default").attr("href")
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
    const name = $("#product-name").text()
    const producer = $("#product-subname").text()
    //const rawDeposit = turnToNumber($(".price-deposit").text().replace(/\s/g, "").slice(10))
    //const deposit = !rawDeposit || rawDeposit < 0 || Number.isNaN(rawDeposit) ? 0 : rawDeposit
    const ean = $("[itemprop=sku]").text()
    const sizeRaw = $(".js-details").text()
    const wholeNumberOfPrice = $(".whole-number ").text()
    const decimalsOfPrice = $(".decimal").text()
    const price = Number((`${wholeNumberOfPrice}.${decimalsOfPrice}`))
    const description = $("div[id=info] [itemprop=description]").first().text()
    const imageLink = $("img[class=product-image]").attr("src")

    let size = getSize(name, price) || getSize(sizeRaw) || getSize(productLink)

    const percentage = getPercentage(name)

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

    if (ean === "6420613935003") { //faulty info
      return
    }
    if (ean === "8594007310573") {
      size = 0.5
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
      store: "foodie"
    }
    drinkInfos.push(drinkInfo)
  }))
  return drinkInfos
}

const foodieCategories = [
  {
    name: "Oluet",
    code: 1041
  },
  {
    name: "Siiderit",
    code: 1051
  },
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
]

const getFoodie = async () => {
  const infos = []
  console.log("Getting drinks from foodie")
  await Promise.all(foodieCategories.map(async (category) => {
    const infosForCategory = await getDrinkInfos(category.code, category.name)
    infos.push(...infosForCategory)
  }))
  console.log("Got drinks from foodie")
  return infos
}

module.exports = getFoodie