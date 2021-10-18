const puppeteer = require("puppeteer")
const {
  turnToNumber,
  getSize,
  getPercentage,
  capitalizeFirst,
  puppeteerSettings,
} = require("../utils")

const url = "https://shopping.tallink.com/fi/tal-hel-bq/category/juomat/"

const getDrinkInfos = async (categoryUrl, categoryName, pageNumber) => {
  const drinkInfos = []

  const pageLink = `${url}${categoryUrl}?page=${pageNumber || 1}&countPerPage=120`

  const browser = await puppeteer.launch(puppeteerSettings)
  const page = await browser.newPage()
  await page.goto(pageLink, { timeout: 0 })

  let getDrinks = await page.evaluate(() => {
    const mainPart = document.querySelector(".main-view")
    if (!mainPart) {
      return false
    }
    const items = mainPart.querySelectorAll(".ng-scope.ng-isolate-scope")
    const results = []
    items.forEach((item) => {
      const title = item.querySelector(".title.ng-binding").innerText
      const link = item.querySelector(".hover-search-icon").getAttribute("href")
      const producer = item.querySelector(".manufacturer").innerText
      const imagelink = item.querySelector(".image > img").getAttribute("src")
      const price = item.querySelector(".top-price").innerText
      results.push({
        title,
        link,
        imagelink,
        price,
        producer,
      })
    })
    return results
  })

  const rawDrinks = []
  const result = getDrinks
  if (result) {
    rawDrinks.push(...result)
  } else {
    //console.log("NO RESULT FOR A SINGLE DRINK", categoryUrl)
  }

  rawDrinks.forEach((rawDrink, i) => {
    if (!rawDrink.title || !rawDrink.link || !rawDrink.imagelink || !rawDrink.price) {
      console.log(`MISSING for ${i} ${categoryUrl} `)
      return
    }

    if (!rawDrink.link.includes("product/juomat")) {
      return
    }

    const title = rawDrink.title

    const percentage = getPercentage(title)
    const size = getSize(title)

    let category = categoryName

    if (category === "VIINIT") {
      const isInName = (words) => {
        const inName = words.some((word) => title.toLowerCase().includes(word))
        return inName
      }
      if (isInName(["red", "punaviini"])) {
        category = "Punaviinit"
      } else if (isInName(["kuoh"])) {
        category = "Kuohuviinit ja Samppanjat"
      } else if (isInName(["valko", "white"])) {
        category = "Valkoviinit"
      } else if (isInName(["rosé", "rose"])) {
        category = "Roseeviinit"
      } else {
        category = "Muut viinit"
      }
      if (percentage <= 1) {
        category = "Alkoholittomat"
      }
    }

    const productCode = rawDrink.link.match(/\b\d{5,6}\b/g)[0] //TÄÄ

    const drinkInfo = {
      name: title,
      productCode,
      link: `https://shopping.tallink.com${rawDrink.link}`,
      price: turnToNumber(rawDrink.price),
      percentage,
      imageLink: `https://shopping.tallink.com${rawDrink.imagelink}`,
      category,
      size,
      producer: capitalizeFirst(rawDrink.producer.toLowerCase()),
      store: "tallink",
    }
    drinkInfos.push(drinkInfo)
  })
  await browser.close()
  return drinkInfos
}

const categories = [
  {
    name: "Oluet",
    url: "miedot-alkoholit/oluet",
  },
  {
    name: "Kuohuviinit ja Samppanjat",
    url: "miedot-alkoholit/samppanja-ja-kuohuviini",
  },
  {
    name: "Siiderit",
    url: "miedot-alkoholit/siiderit",
  },
  {
    name: "Juomasekoitukset ja lonkerot",
    url: "miedot-alkoholit/long-drink",
  },
  {
    name: "Juomasekoitukset ja lonkerot",
    url: "miedot-alkoholit/cocktailit-ja-juomasekoitukset",
  },
  {
    name: "VIINIT",
    url: "miedot-alkoholit/viinit",
    pages: [1, 2, 3],
  },
  {
    name: "Muut viinit",
    url: "miedot-alkoholit/vermutit",
  },
  {
    name: "Liköörit ja Katkerot",
    url: "vahvat-alkoholit/vahvat-likoeoerit",
  },
  {
    name: "Liköörit ja Katkerot",
    url: "miedot-alkoholit/likoeoerit",
  },
  {
    name: "Konjakit",
    url: "vahvat-alkoholit/konjakki",
  },
  {
    name: "Brandyt Armanjakit ja Calvadosit",
    url: "vahvat-alkoholit/brandy",
  },
  {
    name: "Brandyt Armanjakit ja Calvadosit",
    url: "vahvat-alkoholit/calvados",
  },
  {
    name: "Viskit",
    url: "vahvat-alkoholit/viskit",
  },
  {
    name: "Vodkat ja Viinat",
    url: "vahvat-alkoholit/vodka",
  },
  {
    name: "Ginit ja maustetut viinat",
    url: "vahvat-alkoholit/gini",
  },
  {
    name: "Ginit ja maustetut viinat",
    url: "vahvat-alkoholit/muut-vahvat-alkoholit",
  },
  {
    name: "Ginit ja maustetut viinat",
    url: "vahvat-alkoholit/tequila",
  },
  {
    name: "Rommit",
    url: "vahvat-alkoholit/rommi",
  },
]
const getTallink = async () => {
  const infos = []
  console.log("Getting drinks from tallink")
  for (const category of categories) {
    if (category.pages) {
      for (const page of category.pages) {
        const infosForCategory = await getDrinkInfos(category.url, category.name, page)
        infos.push(...infosForCategory)
      }
    } else {
      const infosForCategory = await getDrinkInfos(category.url, category.name)
      infos.push(...infosForCategory)
    }
  }
  console.log("Got drinks from tallink")
  return infos
}

module.exports = getTallink
