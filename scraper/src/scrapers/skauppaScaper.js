const axios = require("axios")
const { getSize, getPercentage } = require("../utils")

const sKauppaCategories = [
  {
    name: "Oluet",
    code: "oluet",
    depositEstimate: 0.15,
  },
  {
    name: "Siiderit",
    code: "siiderit",
    depositEstimate: 0.15,
  },
  {
    name: "Juomasekoitukset ja lonkerot",
    code: "lonkerot",
    depositEstimate: 0.15,
  },
  {
    name: "Juomasekoitukset ja lonkerot",
    code: "alkoholijuomasekoitukset",
    depositEstimate: 0.1,
  },
  {
    name: "Muut viinit",
    code: "viinit",
    depositEstimate: 0.1,
  },
]

const getSKaupat = async () => {
  console.log("Getting drinks from S-Kaupat")
  const allDrinks = []
  for (const category of sKauppaCategories) {
    const res = await axios.get(
      `https://cfapi.voikukka.fi/graphql?operationName=RemoteFilteredProducts&variables=%7B%22includeAvailabilities%22%3Afalse%2C%22availabilityDate%22%3A%222023-09-03%22%2C%22facets%22%3A%5B%7B%22key%22%3A%22brandName%22%2C%22order%22%3A%22asc%22%7D%2C%7B%22key%22%3A%22labels%22%7D%5D%2C%22generatedSessionId%22%3A%2209df7565-7be0-4f83-85bd-2241bc7f0c85%22%2C%22includeAgeLimitedByAlcohol%22%3Atrue%2C%22limit%22%3A1000%2C%22queryString%22%3A%22%22%2C%22searchProvider%22%3A%22loop54%22%2C%22slug%22%3A%22juomat-1%2F${category.code}%22%2C%22storeId%22%3A%22513971200%22%2C%22useRandomId%22%3Afalse%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%225f945c6cb94688b198568353ee2ee568f244272d08c9924451f703277cc88f8e%22%7D%7D`,
      {
        headers: {
          "accept-language": "en-FI,en-US;q=0.9,en;q=0.8,fi-FI;q=0.7,fi;q=0.6,en-GB;q=0.5",
          "content-type": "application/json",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "sec-gpc": "1",
          "x-client-name": "skaupat-web",
          "x-client-version": "production-dc70748377c34efa2eb3f755a6b4c0e7cf7ada09",
          "x-dtc":
            'sn="v_4_srv_10_sn_VI96T0IRODB8IISD368NFL44RRFUADEH", pc="10$553519124_520h3vHPHFBIHAUIAKSAMBTHOMKULKPKLFCVRM-0e0", v="1693753397690TSA7L29U8HCSJ2FARQ37P1CD0111JBLD", app="839bc85a9cc0800e", r="https://www.s-kaupat.fi/tuotteet/juomat-1/oluet?limit=100"',
        },
        referrerPolicy: "no-referrer",
        body: null,
      }
    )
    const drinksForCategory = res.data.data.store.products.items
    const drinks = drinksForCategory.map((drink) => {
      let size = getSize(drink.name, drink.price)
      if (!size && drink.comparisonUnit === "LTR") {
        const priceWithoutDeposit = drink.price - category.depositEstimate
        size = priceWithoutDeposit / drink.comparisonPrice
      }
      return {
        name: drink.name,
        producer: drink.brandName,
        ean: drink.ean,
        link: `https://www.s-kaupat.fi/tuote/${drink.ean}`,
        price: drink.price,
        percentage: getPercentage(drink.name),
        imageLink: `https://cdn.s-cloud.fi/v1/w750_q75/product/ean/${drink.ean}_kuva1.jpg`,
        category: category.name,
        size,
        store: "skaupat",
      }
    })
    allDrinks.push(...drinks)
  }
  console.log("Got drinks from S-Kaupat")
  return allDrinks
}

module.exports = getSKaupat
