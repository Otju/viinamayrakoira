describe("PortionCalculatorPage ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/portioncalculator")
  })
  it("page can be opened", function () {
    cy.contains("0 annosta")
  })
  it("adding own drink works", function () {
    cy.get(".btn-success").eq(0).click()
    cy.get("input").eq(6).clear().type(10)
    cy.get("input").eq(7).clear().type("0.5")
    cy.get(".btn-success").eq(2).click()
    cy.get(".close").eq(1).click()
    cy.contains("3.29 annosta")
    cy.contains("Oma määrä (0.5 l)")
    cy.contains("Oma juoma")
  })
  it("searchin and adding drink works, and deleting works", function () {
    
    cy.get(".btn-success").eq(0).click()
    cy.get("input").eq(5).clear().type("gambina{enter}")
    cy.get(".list-group-item").click()
    cy.contains("Gambina")
    cy.get(".dropdown-toggle").eq(5).click()
    cy.get(".dropdown-item-text").eq(4).click()
    cy.get(".btn-success").eq(2).click()
    cy.get(".close").eq(1).click()

    const array = ["Gambina muovipullo", "Lasillinen (0.2 l)", "2.76 annosta", "2.59€"]
    array.forEach(item => {
      cy.contains(item)
    })

    cy.get(".btn-danger").eq(0).click()

    cy.contains("0 annosta")
    cy.contains("Gambina muovipullo").should("not.exist")
  })
})