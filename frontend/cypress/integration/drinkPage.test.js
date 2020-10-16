describe('Drinkpage ', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/drinks')
  })
  it('drinkpage defaultpage contains cheapest drink (Africana)', function () {
    cy.contains('Africana')
  })
  it('defaultpage contains 25 first drinks', function () {
    cy.hasDrink("pricePerPortion", null, 25)
  })
  describe('Search tests ', function () {
    it('store search works (foodie)', function () {
      cy.get('.dropdown').eq(0).click()
      cy.get('.dropdown-item-text').eq(2).click()
      cy.hasDrink("pricePerPortion", "foodie", 25)
    })
    it('category search works (beer)', function () {
      cy.get('.dropdown').eq(1).click()
      cy.get('.dropdown-item-text').eq(6).click()
      cy.get('.dropdown').eq(1).click()
      cy.hasDrink("pricePerPortion", null, 25, "oluet")
    })
    it('minMax and sort searches work', function () {
      cy.visit("http://localhost:3000/drinks?&sortByField=size&sortByDescending=true&minprice=2&maxprice=16&maxpercentage=14&minpricePerLitre=3")
      cy.hasDrink("size", null, 25, null)
    })
  })
})