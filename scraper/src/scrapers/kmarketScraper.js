const puppeteer = require('puppeteer')
const { turnToNumber } = require('../utils')
const roundTo = require('round-to')

const kmarketUrl = "https://www.k-ruoka.fi/kauppa/tuotehaku/juomat/"

const getDrinkInfos = async (categoryUrlName, categoryName) => {

  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 50)
      })
    })
  }

  const drinkInfos = []

  const pageLink = kmarketUrl + categoryUrlName

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(pageLink)
  await autoScroll(page)

  // Usage:
  // optionally change the scope as final parameter too, like ECMA5

  let getDrinks = await page.evaluate(() => {
    const items = document.querySelectorAll(".bundle-list-item")
    const results = []
    items.forEach((item) => {
      const title = item.querySelector('.product-result-name').innerText
      const link = item.querySelector('.click-area').getAttribute("href")
      const imagelink = item.querySelector('.product-result-image > div > img').getAttribute("src")
      const priceInt = item.querySelector('.price-integer-part').innerText
      const priceDecimal = item.querySelector('.price-fractional-part').innerText
      const price = `${priceInt}.${priceDecimal}`
      results.push({
        title,
        link,
        imagelink,
        price
      })
    })
    return results;
  })

  const rawDrinks = getDrinks

  rawDrinks.forEach(rawDrink => {

    let percentage
    const title = rawDrink.title

    title.split(" ").forEach((part, i) => {
      if (part.includes("%")) {
        let partToInt = turnToNumber(part)
        if ((!partToInt || Number.isNaN(partToInt)) && partToInt !== 0) {
          partToInt = turnToNumber(title.split(" ")[i - 1])
        }
        percentage = partToInt
      }
    })

    let category = categoryName

    if (!category) {
      const isInName = (words) => {
        const inName = words.some(word => name.toLowerCase().includes(word))
        return inName || inDesc
      }
      if (category === "Muut viinit") {
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
    }

    let size

    const sizeMatchL = title.match(/\d?.?,?\d+l/g)
    if (sizeMatchL) {
      size = turnToNumber(sizeMatchL[0])
    }
    const sizeMatchCl = title.match(/\d?.?,?\d+cl/g)
    if (sizeMatchCl) {
      size = turnToNumber(sizeMatchCl[0]) / 100
    }

    const ean = rawDrink.link.match(/\b\d{13}\b/g)[0]

    const drinkInfo = {
      name: title.includes("Vain myymälästä") ? title.slice(0, -17) : title,
      ean,
      link: `https://www.k-ruoka.fi${rawDrink.link}`,
      price: turnToNumber(rawDrink.price),
      percentage,
      imageLink: rawDrink.imagelink,
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

const vikingLineCategories = [
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

const getFoodie = async () => {
  const infos = []
  console.log("Getting drinks from kmarket")
  await Promise.all(vikingLineCategories.map(async (category) => {
    const infosForCategory = await getDrinkInfos(category.url, category.name)
    infos.push(...infosForCategory)
  }))
  console.log("Got drinks from kmarket")
  return infos
}


module.exports = getFoodie