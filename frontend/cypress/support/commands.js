Cypress.Commands.add("hasDrink", (params, count, element) => {

  let paramString = ""

  Object.entries(params).forEach(([key, value]) => {
    if (key === "sortByDescending") {
      paramString = paramString.concat(` ${key}: ${value}`)
    } else if (key === "minMax") {
      paramString = paramString.concat((` ${key}: [${value
        .map(item => `{${Object.entries(item)
          .map(([keyIn, valueIn]) => `${keyIn}: ${typeof valueIn === "string" ? `"${valueIn}"` : valueIn}`).join(",")}}`)}]`))
    } else {
      paramString = paramString.concat(` ${key}: ${typeof value === "number" ? value : `"${value}"`}`)
    }
  })

  const query = `query {
    allDrinks(first: ${count || 1}, ${paramString}) 
      {
        name
        price
        pricePerPortion
        percentage
      }
    }`

  cy.request(
    {
      method: "POST",
      url: "http://localhost:4000/",
      body: { query },
    }
  ).then((res) => {
    const drinks = res.body.data.allDrinks
    drinks.forEach(drink => {
      const elementToFind = element || "body"
      cy.get(elementToFind).contains(drink.name) //cypress doesn't find names correctly, even though they're there
      cy.get(elementToFind).contains(drink.percentage)
      cy.get(elementToFind).contains(drink.price)
      cy.get(elementToFind).contains(drink.pricePerPortion)
    })
  })
})

Cypress.Commands.add("deleteUser", (username, expectDeletetion) => {

  const query = `mutation { 
    deleteUser(username: "${username}")
  }`

  cy.request(
    {
      method: "POST",
      url: "http://localhost:4000/",
      body: { query },
    }
  ).then((res) => {
    const message = res.body.data.deleteUser
    if (expectDeletetion) {
      cy.expect(message).to.equal(`removed user ${username}`)
    }
  })
})