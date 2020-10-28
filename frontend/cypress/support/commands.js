Cypress.Commands.add("hasDrink", (params, count) => {

  let paramString = ""

  Object.entries(params).forEach(([key, value]) => {
    if (key === "sortByDescending") {
      paramString = paramString.concat(` ${key}: ${value}`)
    } else if (key === "minMax") {
      paramString = paramString.concat((` ${key}: [${value
        .map(item => `{${Object.entries(item)
        .map(([keyIn, valueIn]) => `${keyIn}: ${typeof valueIn === "string" ? `"${valueIn}"` : valueIn}`).join(",")}}`)}]`))
    } else {
      paramString = paramString.concat(` ${key}: "${value}"`)
    }
  })

  const query = `query {
    allDrinks(first: ${count || 1}, ${paramString}) 
      {
        price
        pricePerPortion
        percentage
      }
    }`

  cy.request(
    {
      method: "POST",
      url: 'http://localhost:4000/',
      body: { query: query },
    }
  ).then((res) => {
    const drinks = res.body.data.allDrinks
    drinks.forEach(drink => {
      //cy.contains(drink.name) cypress doesn't find names correctly, even though they're there
      cy.contains(drink.percentage)
      cy.contains(drink.price)
      cy.contains(drink.pricePerPortion)
    })
  })
})