describe("Drinkpage ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/drinks")
  })
  it("defaultpage contains right drinks", function () {
    cy.hasDrink({ sortByField: "pricePerPortion" }, 29)
  })
  it("can open DrinkModal", function () {
    cy.get(".card-body").eq(0).click()
    cy.hasDrink({ sortByField: "pricePerPortion" }, 1, ".modal-content")
    cy.contains("Kommentit")
    cy.contains("Ilmoita virheestä")
    cy.contains("Kauppaan")
  })
  it("endless scroll works", function () {
    cy.scrollTo("bottom")
    cy.hasDrink({ sortByField: "pricePerPortion" }, 50)
  })
  describe("Search tests ", function () {
    it("text search works", function () {
      cy.get("input").eq(0).type("original long drink{enter}").click()
      cy.hasDrink({ sortByField: "pricePerPortion", name: "original long drink" }, 29)
    })
    it("store search works (foodie)", function () {
      cy.get(".dropdown").eq(0).click()
      cy.get(".dropdown-item-text").eq(2).click()
      cy.hasDrink({ sortByField: "pricePerPortion", store: "foodie" }, 29)
    })
    it("category search works (beer)", function () {
      cy.get(".dropdown").eq(1).click()
      cy.get(".dropdown-item-text").eq(6).click()
      cy.get(".dropdown").eq(1).click()
      cy.hasDrink({ sortByField: "pricePerPortion", category: "oluet" }, 29)
    })
    it("minMax and sort searches work (and query strings)", function () {
      cy.visit("http://localhost:3000/drinks?&sortByField=size&sortByDescending=true&minprice=2&maxprice=16&maxpercentage=14&minpricePerLitre=3")
      cy.hasDrink({ sortByField: "size", sortByDescending: "true", minMax: [{ min: 2, max: 16, name: "price" }, { max: 14, name: "percentage" }, { min: 3, name: "pricePerLitre" }] }, 29)
    })
  })
})