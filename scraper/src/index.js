const getFoodie=  require("./scrapers/foodieScraper")
const getAlko=  require("./scrapers/alkoScraper")
const getSuperAlko =  require("./scrapers/superAlkoScraper")

//getFoodie().then(res => console.log(res))
//getAlko().then(res => console.log(res))
getSuperAlko().then(res => console.log(res))
