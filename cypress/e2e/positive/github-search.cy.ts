/// <reference types="cypress" />

describe("GitHub Search", () => {
  const GITHUB_API_BASE_URL = "https://api.github.com";
  const userSearch = (user: string = "A") => {
    cy.intercept("GET", `${GITHUB_API_BASE_URL}/search/users?q=*`, {
      fixture: "positive.json",
    }).as("userSearch");

    cy.get('[data-testid="search-input"]').type(user);
    cy.get('[data-testid="search-button"]').should("not.be.disabled").click();
    cy.wait("@userSearch");
    cy.get('[data-testid="user-list"]').should("exist");
  };

  beforeEach(() => {
    cy.visit("https://ryo-github-search.vercel.app/");
  });

  it("Should display the SearchBar", () => {
    cy.get('[data-testid="search-input"]')
      .should("exist")
      .should("have.attr", "placeholder", "Enter username")
      .should("have.value", "");
    cy.get('[data-testid="search-button"]')
      .should("exist")
      .should("be.disabled");
  });

  it("Should search for users and display results", () => {
    userSearch("A");
  });

  it("Should open accordion and show repo list", () => {
    userSearch("A");
    cy.get('[data-testid="user-1"]').should("exist").click();
  });

  it("Should close accordion", () => {
    userSearch("A");
    cy.get('[data-testid="user-1"]').should("exist").click();
    cy.get('[data-testid="user-1"]').should("exist").click();
    cy.get('[data-testid="repo-list"]').should("not.exist");
  });
});
