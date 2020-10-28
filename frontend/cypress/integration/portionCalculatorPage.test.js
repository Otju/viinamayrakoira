describe('PortionCalculatorPage ', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/portioncalculator')
  })
  it('page can be opened', function () {
    cy.contains('0 annosta')
  })
  it('adding own drink works', function () {
    cy.get(".btn-success").click()
    cy.get("input").eq(1).clear().type(10)
    cy.get("input").eq(2).clear().type("0.5")
    cy.get(".btn-success").eq(1).click()
    cy.get(".close").click()
    cy.contains("3.29 annosta")
    cy.contains("Oma määrä (0.5 l)")
    cy.contains("Oma juoma")
  })
  it('searchin and adding 2 drinks works, and deleting works', function () {
    cy.get(".btn-success").click()
    cy.get("input").eq(0).type("original long drink")
    cy.get("#scrollDiv").scrollTo('bottom')
    cy.get('.list-group-item:contains("Original Long Drink Strong tölkki")').click()
    cy.contains("Original Long Drink Strong tölkki")
    cy.contains("3.19€")
    cy.get(".dropdown-toggle").click()
    cy.get(".dropdown-item-text").eq(1).click()
    cy.get(".btn-success").eq(1).click()

    cy.get("input").eq(0).type("gambina")
    cy.get('.list-group-item').click()
    cy.contains("Gambina")
    cy.get(".dropdown-toggle").click()
    cy.get(".dropdown-item-text").eq(4).click()
    cy.get(".btn-success").eq(1).click()

    cy.get(".close").click()
    const array = ["5.78€", "4.49 annosta", "Koko juoma (0.35 l)", "Original Long Drink Strong tölkki", "Gambina muovipullo", "Lasillinen (0.2 l)", "2.76 annosta"]
    array.forEach(item => {
      cy.contains(item)
    })

    cy.get(".btn-danger").eq(0).click()
    cy.contains('Original Long Drink Strong tölkki').should('not.exist')
    cy.contains('1.73 annosta').should('not.exist')

    cy.contains("2.76 annosta")
    cy.contains("2.59€")
    cy.contains("Gambina")
  })
})