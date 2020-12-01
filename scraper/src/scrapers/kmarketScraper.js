const puppeteer = require("puppeteer")
const { turnToNumber, getSize, getPercentage } = require("../utils")

const kmarketUrl = "https://www.k-ruoka.fi/kauppa/tuotehaku/juomat/"

const getDrinkInfos = async (categoryUrlName, categoryName) => {

  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        var totalHeight = 0
        var distance = 100
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight
          window.scrollBy(0, distance)
          totalHeight += distance

          if (totalHeight >= scrollHeight) {
            clearInterval(timer)
            resolve()
          }
        }, 50)
      })
    })
  }

  const drinkInfos = []

  const pageLink = kmarketUrl + categoryUrlName

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(pageLink, { timeout: 0 })
  await autoScroll(page)

  let getDrinks = await page.evaluate(() => {
    const items = document.querySelectorAll(".bundle-list-item")
    const results = []
    items.forEach((item) => {
      const title = item.querySelector(".product-result-name").innerText
      const link = item.querySelector(".click-area").getAttribute("href")
      const imagelink = item.querySelector(".product-result-image > div > img").getAttribute("src")
      const priceInt = item.querySelector(".price-integer-part").innerText
      const priceDecimal = item.querySelector(".price-fractional-part").innerText
      const price = `${priceInt}.${priceDecimal}`
      results.push({
        title,
        link,
        imagelink,
        price
      })
    })
    return results
  })

  const rawDrinks = getDrinks

  rawDrinks.forEach(rawDrink => {

    const title = rawDrink.title
    const percentage = getPercentage(title)
    let size = getSize(title) || getSize(rawDrink.link)
    if (!size) {
      if (title.includes("0,5")) {
        size = 0.5
      }
      if (title.includes("0,33")) {
        size = 0.33
      }
      if (title.includes("0,35")) {
        size = 0.35
      }
    }
    const ean = rawDrink.link.match(/\b\d{13}\b/g)[0]

    let category = categoryName

    if (!category) {
      const isInName = (words) => {
        const inName = words.some(word => title.toLowerCase().includes(word))
        return inName
      }
      if (category === "Muut viinit") {
        if (isInName(["red", "punaviini"])) {
          category = "Punaviinit"
        }
        if (isInName(["kuoh"])) {
          category = "Kuohuviinit ja Samppanjat"
        }
        if (isInName(["valko", "white"])) {
          category = "Valkoviinit"
        }
        if (isInName(["rosé", "rose"])) {
          category = "Roseeviinit"
        }
      }
      if (percentage <= 1) {
        category = "Alkoholittomat"
      }
    }

    const drinkInfo = {
      name: title.includes("Vain myymälästä") ? title.slice(0, -17) : title,
      ean,
      link: `https://www.k-ruoka.fi${rawDrink.link}`,
      price: turnToNumber(rawDrink.price),
      percentage,
      imageLink: rawDrink.imagelink.replace("&fill=solid&fill-color=ffffff", "").replace(/w=\d+&h=\d+/, ""),
      category,
      size,
      store: "kmarket"
    }
    if (!drinkInfos.map(drink => drink.ean).includes(ean)) {
      drinkInfos.push(drinkInfo)
    }
  })
  await browser.close()
  return drinkInfos
}

const kmarketCategories = [
  {
    url: "siiderit",
    name: "Siiderit"
  },
  {
    name: "Oluet",
    url: "oluet"
  },
  {
    name: "Juomasekoitukset ja lonkerot",
    url: "lonkerot"
  },
  {
    name: "Juomasekoitukset ja lonkerot",
    url: "juomasekoitukset"
  },
  {
    url: "viinit",
    name: "Muut viinit"
  }
]

const getKmarket = async () => {
  const infos = []
  console.log("Getting drinks from kmarket")
  await Promise.all(kmarketCategories.map(async (category) => {
    const infosForCategory = await getDrinkInfos(category.url, category.name)
    infos.push(...infosForCategory)
  }))
  console.log("Got drinks from kmarket")
  return infos
}

module.exports = getKmarket