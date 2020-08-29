kmaconst puppeteer = require('puppeteer')
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
      const pricePerLitre = item.querySelector('.reference').innerText
      results.push({
        title,
        link,
        imagelink,
        price,
        pricePerLitre
      })
    })
    return results;
  })

  const rawDrinks = getDrinks

  rawDrinks.forEach(rawDrink => {
    let category = categoryName

    if (!category) {
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


    const drinkInfo = {
      name: rawDrink.title,
      ean: rawDrink.title,
      link: `https://www.k-ruoka.fi/${rawDrink.link}`,
      price: turnToNumber(rawDrink.price),
      percentage: rawDrink.title,
      imageLink: rawDrink.imageLink,
      category,
      size: rawDrink.title,
      store: "kmarket"
    }

    drinkInfos.push(drinkInfo)
  })
  await browser.close()
  return drinkInfos
}


const vikingLineCategories = [
  {
    url: "siiderit",
    name: "Siiderit"
  },
  /*
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
  }
  */
]

const getFoodie = async () => {
  const infos = []
  console.log("Getting drinks from vikingLine")
  await Promise.all(vikingLineCategories.map(async (category) => {
    const infosForCategory = await getDrinkInfos(category.url, category.name)
    infos.push(...infosForCategory)
  }))
  console.log("Got drinks from vikingLine")
  console.log(infos)
  return infos
}

module.exports = getFoodie