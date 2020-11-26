describe("BestPage ", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000")
  })
  it("best page can be opened", function () {
    cy.contains("Parhaat juomat")
  })
  it("drinkSticker clicking works", function () {
    cy.wait(2000)
    cy.get(".drinkSticker").eq(3).click()
    cy.hasDrink({ sortByField: "pricePerPortion", store: "alko" },30)
  })
  describe("Contains all correct drinks", function () {
    const stores = [null, "alko", "foodie", "kmarket", "superAlkoLatvia", "superAlkoEesti", "tallink", "eckeroLine"]
    const sortCategories = ["pricePerPortion"]//, "taste", "priceQualityRatio"] dont really work yet because of lack of reviews

    stores.forEach(store => {
      describe(`for ${store || "all stores"}`, function () {
        sortCategories.forEach(sortByField => {
          it(`for sortByField ${sortByField}`, function () {
            cy.hasDrink({ sortByField, store })
          })
        })
      })
    })
  }
  )
})