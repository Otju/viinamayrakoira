describe("Drinkpage ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/drinks")
  })
  it("drinkpage defaultpage contains cheapest drink (Africana)", function () {
    cy.contains("Africana")
  })
  it("defaultpage contains right drinks", function () {
    cy.hasDrink({ sortByField: "pricePerPortion" }, 30)
  })
  it("endless scroll works", function () {
    cy.scrollTo("bottom")
    cy.hasDrink({ sortByField: "pricePerPortion" }, 60)
  })
  describe("Search tests ", function () {
    it("text search works", function () {
      cy.get("input").eq(0).type("original long drink{enter}").click()
      cy.hasDrink({ sortByField: "pricePerPortion", name: "original long drink" }, 30)
    })
    it("store search works (foodie)", function () {
      cy.get(".dropdown").eq(0).click()
      cy.get(".dropdown-item-text").eq(2).click()
      cy.hasDrink({ sortByField: "pricePerPortion", store: "foodie" }, 30)
    })
    it("category search works (beer)", function () {
      cy.get(".dropdown").eq(1).click()
      cy.get(".dropdown-item-text").eq(6).click()
      cy.get(".dropdown").eq(1).click()
      cy.hasDrink({ sortByField: "pricePerPortion", category: "oluet" }, 30)
    })
    it("minMax and sort searches work (and query strings)", function () {
      cy.visit("http://localhost:3000/drinks?&sortByField=size&sortByDescending=true&minprice=2&maxprice=16&maxpercentage=14&minpricePerLitre=3")
      cy.hasDrink({ sortByField: "size", sortByDescending: "true", minMax: [{ min: 2, max: 16, name: "price" }, { max: 14, name: "percentage" }, { min: 3, name: "pricePerLitre" }] }, 30)
    })
  })
})