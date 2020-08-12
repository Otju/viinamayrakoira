const cheerio = require('cheerio');
const got = require('got');

const foodieUrl = "https://www.foodie.fi/products/"

const isName = (i, link) => {

}

const getDrinkInfo = async (drinkCategoryNumber) => {

  const links = []

  const getPage = async (page) => {
    const response = await got(foodieUrl + drinkCategoryNumber + "/page/" + page)
    const $ = cheerio.load(response.body)
    $('.js-link-item').each((i, item) => {
      const link = $(item).attr("href")
      links.push(link)
    })
    const isNotLastPage = $('.js-load-more.btn.btn-default').attr("href")
    return  isNotLastPage
  }

  let isNotLastPage = true
  for(let i = 1; isNotLastPage; i++){
    isNotLastPage = await getPage(i)
  }

  links.forEach(async (link) => {
    
  })

}
getDrinkInfo(14018)