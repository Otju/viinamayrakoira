const puppeteer = require("puppeteer")
const fetch = require("node-fetch")
const { puppeteerSettings } = require("../utils")

const kmarketUrl = "https://www.k-ruoka.fi/kauppa/tuotehaku/juomat/"

const getKmarket = async () => {
  const infos = []
  const pageLink = kmarketUrl
  const browser = await puppeteer.launch(puppeteerSettings)
  const page = await browser.newPage()
  await page.goto(pageLink, { timeout: 0 })
  page.on("console", async (msg) => {
    const msgArgs = msg.args()
    for (let i = 0; i < msgArgs.length; ++i) {
      console.log(await msgArgs[i].jsonValue())
    }
  })
  const val = await page.evaluate(() => {
    const url = "oluet"
    const limit = 5
    let offset = 0
    let remaining = 1
    const results = []
    while (remaining > 0) {
      const newResults = fetch(
        `https://www.k-ruoka.fi/kr-api/v2/product-search/?offset=${offset}&language=fi&categoryPath=juomat%2F${url}&storeId=N106&limit=${limit} `,
        {
          method: "POST",
          headers: {
            "x-k-build-number": 11627,
          },
        }
      ).then((res) => res.json())
      remaining = newResults.totalHits - offset - limit
      offset += limit
      results.push(newResults)
      console.log("RESULTS:", newResults)
    }
    return results
  })
  console.log(val)
  return infos
}

/*
{
  result: [
    {
      type: 'product',
      id: '6430064710197',
      ean: '6430064710197',
      baseEan: '6430064710197',
      localizedName: [Object],
      store: [Object],
      availability: [Object],
      isAvailable: false,
      mobilescan: [Object],
      restriction: [Object],
      category: [Object],
      section: '5220',
      productAttributes: [Object],
      images: [Array],
      kind: 'v3',
      adInfo: [Object]
    }
  ],
  totalHits: 778,
  categoryPath: 'juomat/oluet',
  language: 'fi',
  localizedCategoryName: { finnish: 'Oluet', swedish: 'Öl' },
  storeId: 'N106',
  type: 'product-search',
  suggestions: { searchTerms: [] }
}
*/

module.exports = getKmarket
