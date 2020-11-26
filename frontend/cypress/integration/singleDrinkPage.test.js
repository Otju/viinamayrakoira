describe("singleDrinkPage and user management", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/drink/29005superAlkoLatvia")
  })

  const submit = () => {
    cy.get("input[type='submit']").click()
  }

  const login = () => {
    cy.deleteUser("TestUser")
    cy.get("#loginButton").click()
    cy.get("#registerFormLink").click()
    cy.get("#käyttäjänimi").type("TestUser")
    cy.get("#sähköposti").type("test@email.com")
    cy.get("#salasana").type("password")
    submit()
  }

  describe("user management", function () {

    it("can't register with incorrect info, but can with correct", function () {

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
      cy.contains("19characterusername")
    })

    it("can log in and out", function () {
      cy.get("#loginButton").click()

      cy.get("#käyttäjänimi").type("19characterusername")
      cy.get("#salasana").type("salasanA")
      submit()

      cy.contains("Väärä käyttäjänimi tai salasana")

      cy.get("#salasana").clear().type("salasana")
      submit()

      cy.contains("Kirjauduit sisään")
      cy.contains("19characterusername")

      cy.get(".dropdown-toggle").click()
      cy.get(".dropdown-item-text").click()

      cy.contains("Kirjauduit ulos")
      cy.contains("19characterusername").should("not.exist")
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

    it("can review when logged in and review form validation works", function () {
      login()
      cy.wait(1000)
      cy.reload()
      cy.get("a[data-rb-event-key='review']").click()

      cy.get(".btn-success").click()
      cy.contains("Täytä kaikki tarvittavat kentät")
      cy.contains("×")


      cy.get(".react-stars").eq(2).click()
      cy.get(".react-stars").eq(3).click()

      cy.get(".btn-success").click()

      cy.contains("Kiitos arvostelusta")

      cy.get(".btn-success").click()

      cy.contains("Muokkaa arvostelua")
      cy.contains("Poista arvostelu")
      cy.wait(100)
      cy.get(".btn-success").click()
      const string = "s".repeat(1001)
      cy.get("#kommentti").type(string, { delay: 0 })
      cy.get(".btn-success").click()
      cy.contains("Kommentti on liian pitkä (max 1000 merkkiä)")

      cy.get("#kommentti").type("{backspace}")
      cy.get(".btn-success").click()

      cy.contains("Kiitos arvostelusta!")
      cy.contains(string.slice(0, -1))
      cy.contains("1 arvostelu")
      cy.contains("1 kommentti")

      cy.get(".btn-danger").eq(1).click()

      cy.contains("0 arvostelua")
      cy.contains("0 kommenttia")
      cy.contains("Kommentti")
      cy.contains("Hinta-laatu*")
    })
  })
})