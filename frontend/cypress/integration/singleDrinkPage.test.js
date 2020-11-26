describe("singleDrinkPage and user management", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/drink/28223superAlkoLatvia")
  })

  describe.only("user management", function () {
    it("can't register with incorrect info, but can with correct", function () {
      const submit = () => {
        cy.get("input[type='submit']").click()
      }

      const fieldIsInvalid = (field, not) => {
        cy.get(field).should(`${not ? "not." : ""}have.class`, "is-invalid")
      }

      cy.deleteUser("19characterusername")

      cy.get("#loginButton").click()
      cy.get("#registerFormLink").click()
      cy.get("#käyttäjänimi").type("te")
      cy.get("#sähköposti").type("sssdwad@")
      cy.get("#salasana").type("dwaad")
      submit()
      cy.contains("Käyttäjänimi on liian lyhyt (min 3 merkkiä)")
      fieldIsInvalid("#käyttäjänimi")

      cy.get("#käyttäjänimi").clear().type("21characterusername21")
      submit()
      cy.contains("Käyttäjänimi on liian pitkä (max 20 merkkiä)")
      fieldIsInvalid("#käyttäjänimi")

      cy.get("#käyttäjänimi").clear().type("19characterusername")
      submit()
      fieldIsInvalid("#käyttäjänimi", true)
      fieldIsInvalid("#sähköposti")
      cy.contains("Syötä oikea sähköposti")

      cy.get("#sähköposti").clear().type("coolemail@gmail.com")
      submit()
      fieldIsInvalid("#sähköposti", true)
      fieldIsInvalid("#salasana")
      cy.contains("Salasana on liian lyhyt (min 6 merkkiä)")

      cy.get("#salasana").clear().type("salasana")
      submit()

      cy.contains("Loit tilin ja kirjauduit sisään")
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