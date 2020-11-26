describe("singleDrinkPage and user management", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/drink/28223superAlkoLatvia")
  })

  describe.only("user management", function () {
    it("can't register with incorrect info", function () {
      cy.get("#loginButton").click()
      cy.get("#registerFormLink").click()

    })
  })

  describe("singleDrinkPage", function () {
    it("opens correctly and right messagfe when no comments", function () {
      cy.hasDrink({ sortByField: "pricePerPortion", offset: 1 }, 1)
      cy.contains("Kommentit")
      cy.contains("Ilmoita virheestä")
      cy.contains("Kauppaan")
      cy.contains("Ei vielä arvosteluja")
    })

    it("reviewing correctly disabled when not logged in", function () {
      cy.get("a[data-rb-event-key='review']").click()
      cy.contains("Sinun täytyy kirjautua sisään arvostellaksesi juoman")
    })

    it("can review when logged in", function () {
    })
  })
})