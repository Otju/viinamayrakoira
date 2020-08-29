const puppeteer = require('puppeteer')
const { turnToNumber } = require('../utils')
const roundTo = require('round-to')

const vikingLineUrl = "https://www.vikingline.fi/merella/ostokset/helsinki-tallinna-hinnasto/"

const getDrinkInfos = async (categoryUrlName, categoryName) => {

  const drinkInfos = []

  const link = vikingLineUrl + categoryUrlName

  let category = categoryName

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(link)
  await page.screenshot({ path: 'example.png' })

  await browser.close()

  /*
    console.log(item)
    const name = $('.taxfree-product-title').text()
    const producer = $('#product-subname').text()
    const rawDeposit = turnToNumber($('.price-deposit').text().replace(/\s/g, "").slice(10))
    const deposit = !rawDeposit || rawDeposit < 0 || Number.isNaN(rawDeposit) ? 0 : rawDeposit
    const ean = $('[itemprop=sku]').text()
    const sizeRaw = $('.js-details').text()
    const wholeNumberOfPrice = $('.whole-number ').text()
    const decimalsOfPrice = $('.decimal').text()
    const price = Number((`${wholeNumberOfPrice}.${decimalsOfPrice}`))
    const description = $('div[id=info] [itemprop=description]').first().text()
    const imageLink = $('img[class=product-image]').attr("src")
    let percentage
    let size
    if (!category) {
      /*
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
      store: "vikingLine"
    }
    drinkInfos.push(drinkInfo)
  })
  */
  return drinkInfos
}

const vikingLineCategories = [
  {
    url: "vakevat-alkoholijuomat"
  },
  {
    url: "keskivahvat-alkoholijuomat",
  },
  {
    url: "oluet-ja-siiderit",
  },
  {
    name: "Juomasekoitukset ja lonkerot",
    url: "long-drink"
  },
  {
    url: "viinit",
  },
  {
    url: "samppanjat",
    name: "kuohuviinit ja samppanjat"
  }
]

const getFoodie = async () => {
  const infos = []
  console.log("Getting drinks from vikingLine")
  await Promise.all(vikingLineCategories.map(async (category) => {
    const infosForCategory = await getDrinkInfos(category.url, category.name)
    infos.push(...infosForCategory)
  }))
  console.log("Got drinks from vikingLine")
  return infos
}

module.exports = getFoodie