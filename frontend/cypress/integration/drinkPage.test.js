describe('Drinkpage ', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/drinks')
  })
  it('drinkpage defaultpage contains cheapest drink (Africana)', function () {
    cy.contains('Africana')
  })
  it('defaultpage contains 25 first drinks', function () {
    cy.hasDrink("pricePerPortion", null, 25)
  }
  )
})