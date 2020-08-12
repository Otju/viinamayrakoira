const cheerio = require('cheerio');
const got = require('got');

const foodieUrl = "https://www.foodie.fi"

const isName = (i, link) => {

}

const getDrinkInfos = async (drinkCategoryNumber) => {

  const links = []

  const getPage = async (page) => {

    const response = await got(foodieUrl + "/products/" + drinkCategoryNumber + "/page/" + page)
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
    const productLink = foodieUrl + link
    const response = await got(productLink)
    const $ = cheerio.load(response.body)
    const name = $('#product-name').text()
    const producer = $('#product-subname').text()
    const ean = $('[itemprop=sku]').text()
    const wholeNumberOfPrice = $('.whole-number ').text()
    const decimalsOfPrice = $('.decimal').text()
    const price = Number((`${wholeNumberOfPrice}.${decimalsOfPrice}`))
    const description = $('[itemprop=description]').text()
    const drinkInfo = {
      name,
      producer,
      ean,
      link: productLink,
      price,
      description
    }
    drinkInfos.push(drinkInfo)
  }))
  return drinkInfos
}
getDrinkInfos(14018).then(r => console.log(r))