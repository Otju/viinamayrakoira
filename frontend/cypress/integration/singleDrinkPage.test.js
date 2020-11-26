describe("singleDrinkPage ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/drink/28223superAlkoLatvia")
  })

  it("opens correctly", function () {
    cy.hasDrink({ sortByField: "pricePerPortion", offset: 1 }, 1)
    cy.contains("Kommentit")
    cy.contains("Ilmoita virheestä")
    cy.contains("Kauppaan")
  })
})