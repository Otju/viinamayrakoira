const cheerio = require('cheerio');
const got = require('got');

const foodieUrl = "https://www.foodie.fi"

const percentageStringToFloat = (string) => parseFloat(string.replace("%","").replace(",","."))

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
    const description = $('div[id=info] [itemprop=description]').first().text()
    const imageLink = $('img[class=product-image]').attr("src")
    let percentage
    name.split(" ").forEach((part,i) => {
      if(part.includes("%")){
        let partToInt = percentageStringToFloat(part)
        if(Number.isNaN(partToInt)){
          partToInt = percentageStringToFloat(name.split(" ")[i-1])
        }
        percentage = partToInt
        return
      }
    })
    const drinkInfo = {
      name,
      producer,
      ean,
      link: productLink,
      price,
      description,
      percentage,
      imageLink
    }
    drinkInfos.push(drinkInfo)
  }))
  return drinkInfos
}
getDrinkInfos(14018).then(r => console.log(r))