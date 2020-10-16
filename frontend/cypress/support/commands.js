Cypress.Commands.add("hasDrink", (sortByField, store) => {
  let params = `sortByField: "${sortByField}"`
  if(store){
    params += ` store: "${store}"`
  }
  const query = `query {
    allDrinks(first: 1, ${params}) 
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
    const drink = res.body.data.allDrinks[0]
    cy.contains(drink.name)
    cy.contains(drink.price)
    cy.contains(drink.pricePerPortion)
  })
})