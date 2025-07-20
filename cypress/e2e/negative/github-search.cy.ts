/// <reference types="cypress" />

describe("GitHub Search - Negative Scenarios", () => {
  const GITHUB_API_BASE_URL = "https://api.github.com";

  beforeEach(() => {
    cy.visit("https://ryo-github-search.vercel.app/");
  });

  it("Should display no results message when no users are found", () => {
    const user = "dalmations10123456789";

    cy.intercept("GET", `${GITHUB_API_BASE_URL}/search/users?q=*`, {
      statusCode: 200,
      body: {
        total_count: 0,
        incomplete_results: false,
        items: [],
      },
    }).as("noUsersFound");

    cy.get('[data-testid="search-input"]').type(user);
    cy.get('[data-testid="search-button"]').should("not.be.disabled").click();
    cy.wait("@noUsersFound");

    cy.get('[data-testid="user-list"]').should("not.exist");
    cy.get('[data-testid="no-users"]').should("exist");
  });

  it("Should display an error message on API failure for user search", () => {
    const searchTerm = "error_test";

    cy.intercept("GET", `${GITHUB_API_BASE_URL}/search/users?q=*`, {
      statusCode: 500,
    }).as("userSearchError");

    cy.get('[data-testid="search-input"]').type(searchTerm);
    cy.get('[data-testid="search-button"]').should("not.be.disabled").click();
    cy.wait("@userSearchError");

    cy.get('[data-testid="user-list"]').should("not.exist");
    cy.get('[data-testid="error-indicator"]')
      .should("exist")
      .and(
        "contain",
        "Error!Failed to fetch users: GitHub API error: Internal Server Error"
      );
  });

  it("Should keep search button disabled for empty search term", () => {
    cy.get('[data-testid="search-input"]').should("have.value", "");
    cy.get('[data-testid="search-button"]').should("be.disabled");

    cy.get('[data-testid="search-input"]').type("some text");
    cy.get('[data-testid="search-button"]').should("not.be.disabled");

    cy.get('[data-testid="search-input"]').clear();
    cy.get('[data-testid="search-button"]').should("be.disabled");
  });

  it("Should display no repositories message when user has no public repos", () => {
    cy.intercept("GET", `${GITHUB_API_BASE_URL}/search/users?q=*`, {
      fixture: "negative.json",
    }).as("userSearch");

    cy.get('[data-testid="search-input"]').type("norepouser");
    cy.get('[data-testid="search-button"]').should("not.be.disabled").click();
    cy.wait("@userSearch");
    cy.get('[data-testid="user-list"]').should("exist");

    cy.intercept("GET", `${GITHUB_API_BASE_URL}/users/*/repos`, {
      statusCode: 200,
      body: [],
    }).as("noUserRepos");

    cy.get('[data-testid="user-1"]').should("exist").click();
    cy.wait("@noUserRepos");

    cy.get('[data-testid="repository-list"]').should("not.exist");
    cy.get('[data-testid="no-repo"]')
      .should("exist")
      .and("contain", "No public repositories found for this user.");
  });
});
