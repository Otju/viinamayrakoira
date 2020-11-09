it("StatististicsPage opens ", function () {
  cy.visit("http://localhost:3000/statistics")
  cy.contains("Juomia yhteensä")
  cy.contains("Keskimääräinen annoshinta kaupoittain")
})

it("StatististicsPage opens ", function () {
  cy.visit("http://localhost:3000/moreinfo")
  cy.contains("Lahjoitukset")
  cy.contains("Sivut")
  cy.contains("Juomat")
})