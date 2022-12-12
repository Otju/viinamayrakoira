const puppeteer = require("puppeteer")
const { puppeteerSettings, getPercentage, getMoreAccurateCategory, getSize } = require("../utils")
const fs = require("fs")

const isGettedFromFile = true
const getKmarket = async () => {
  console.log("Getting drinks from K-Market")
  const rawData = isGettedFromFile
    ? JSON.parse(fs.readFileSync("./data/rawKMarketDrinks.json"))
    : await getRawKMarketData()
  const info = rawData.map(
    ({ ean, localizedName, description, mobilescan, productAttributes, categoryName }) => {
      const measurements = productAttributes.measurements
      const name = localizedName.finnish
      const price = mobilescan.pricing.normal.price
      const link = `https://www.k-ruoka.fi/kauppa/tuote/${productAttributes.urlSlug}`
      const imageLink = productAttributes.imageUrl
      const producer = productAttributes.brand
      const percentage = getPercentage(name)
      const category = getMoreAccurateCategory({
        category: categoryName,
        percentage,
        name,
        description,
      })
      const store = "kmarket"
      const size = measurements.contentUnit
        ? getSize(`${measurements.contentSize}${measurements.contentUnit}`)
        : measurements.contentSize

      return {
        name,
        producer,
        ean,
        link,
        price,
        description,
        percentage,
        imageLink,
        category,
        size,
        store,
      }
    }
  )
  console.log("Got drinks from K-Market")
  return info
}

const getRawKMarketData = async () => {
  const rawDrinks = []
  const kMarketCategories = [
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
      code: "juomasekoitukset",
    },
    {
      name: "Muut viinit",
      code: "viinit",
    },
    {
      name: "Muut viinit",
      code: "kausijuomat",
    },
  ]
  for (const category of kMarketCategories) {
    const drinksFromCategory = await getDrinksFromCategory(category)
    rawDrinks.push(...drinksFromCategory)
  }
  fs.writeFileSync("./data/rawKMarketDrinks.json", JSON.stringify(rawDrinks))
  return rawDrinks
}

const getDrinksFromCategory = async (category) => {
  const kmarketUrl = "https://www.k-ruoka.fi"
  const drinksFromCategory = []
  let offset = 0
  let remaining = 99999
  while (remaining > 0) {
    const browser = await puppeteer.launch(puppeteerSettings)
    const page = await browser.newPage()
    await page.goto(kmarketUrl, { timeout: 0 })
    page.on("console", async (msg) => {
      const msgArgs = msg.args()
      for (let i = 0; i < msgArgs.length; ++i) {
        console.log(await msgArgs[i].jsonValue())
      }
    })
    const info = await page.evaluate(
      async (offset, category) => {
        const categoryName = category.name
        const limit = 150
        let newOffset
        let newRemaining
        const results = []
        const response = await fetch(
          `/kr-api/v2/product-search/?offset=${offset}&language=fi&categoryPath=juomat%2F${category.code}&storeId=N106&limit=${limit}`,
          {
            method: "POST",
            headers: {
              "x-k-build-number": 11627,
            },
          }
        )
        const text = await response.text()
        try {
          const info = JSON.parse(text)
          newOffset = offset + limit
          newRemaining = info.totalHits - offset - limit
          const drinks = info.result
          results.push(...drinks.map((drink) => ({ ...drink, categoryName })))
        } catch (e) {
          if (text.includes("Just a moment...")) {
            console.log("Blocked by CloudFlare")
          } else {
            console.log(text)
          }
        }
        return { results, newOffset, newRemaining }
      },
      offset,
      category
    )
    drinksFromCategory.push(...info.results)
    offset = info.newOffset
    remaining = info.newRemaining
    let pages = await browser.pages()
    await Promise.all(pages.map((page) => page.close()))
    await browser.close()
    await new Promise((r) => setTimeout(r, 10 * 1000))
  }
  return drinksFromCategory
}

module.exports = getKmarket
