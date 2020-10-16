describe('BestPage ', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })
  it('best page can be opened', function () {
    cy.contains('Parhaat juomat')
  })
  it('best page contains cheapest drink (Africana)', function () {
    cy.contains('Africana')
  })
  describe('Contains all correct drinks', function () {
    const stores = [null, "alko", "foodie", "kmarket", "superAlkoLatvia", "superAlkoEesti", "tallink", "eckeroLine"]
    const sortCategories = ["pricePerPortion"]//, "taste", "priceQualityRatio"] dont really work yet because of lack of reviews

    stores.forEach(store => {
      describe(`for ${store || "all stores"}`, function () {
        sortCategories.forEach(category => {
          it(`for category ${category}`, function () {
            cy.hasDrink(category, store)
          })
        })
      })
    })
  }
  )
})