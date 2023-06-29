import 'cypress-file-upload';


Cypress.Commands.add("login", (email, password) => {
    cy.get(`[placeholder="Email"]`).type(email)
    cy.get(`[placeholder="Password"]`).type(password)
    cy.get(`[type="submit"]`).click()
})
