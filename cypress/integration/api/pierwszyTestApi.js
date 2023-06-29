/// <reference types="cypress" />

describe("E2E - Testy API", () => {
  it("wyryfikacja tagów API", () => {
    cy.intercept("GET", "https://api.realworld.io/api/tags").as("requestTag");
    cy.visit("https://angular.realworld.io/");
    cy.wait("@requestTag");
    cy.get("@requestTag").then((res) => {
      console.log(res);
      expect(res.response.statusCode).to.equal(200);
      expect(res.response.body.tags)
        .to.contain("welcome")
        .and.to.contain("qui");
    });
  });

  it("niepoprawne logowanie", () => {
    cy.intercept("POST", "https://api.realworld.io/api/users/login").as(
      "requestLogin"
    );
    cy.get("a.nav-link").contains("Sign in").click();
    cy.login("asd@gmail.com", "123123");
    cy.wait("@requestLogin");
    cy.get("@requestLogin").then((res) => {
      console.log(res);
      expect(res.response.statusCode).to.equal(403);
      cy.fixture("example").then((data) => {
        expect(res.response.statusMessage).to.equal(data.statusMessage403);
      });
    });
  });
});
