Cypress.Commands.add("hasDrink", (sortByField, store, count) => {

  let params = `sortByField: "${sortByField}"`
  if (store) {
    params += ` store: "${store}"`
  }
  const query = `query {
    allDrinks(first: ${count || 1}, ${params}) 
      {
        name
        price
        pricePerPortion
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
      cy.contains(drink.name)
      cy.contains(drink.price)
      cy.contains(drink.pricePerPortion)
    })
  })
})