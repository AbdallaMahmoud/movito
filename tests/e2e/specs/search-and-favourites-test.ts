/// <reference types="cypress" />
const appUrl = 'http://localhost:8080/';

describe('Movies End-to-End Test', () => {
  it('Search results should contain the search keyword', () => {
    const searchKeyword = 'water';
    cy.visit(appUrl);
    cy.get('#search-input').type(`${searchKeyword}\n`);
    cy.get('#movies-table tbody tr td:nth-child(2)').contains(searchKeyword);
  });

  it('Starred items should be displayed in favourites section', () => {
    const starredClass = 'text--lighten-3';
    cy.visit(appUrl);
    cy.get('div.v-rating button').eq(0).click();
    cy.get('div.v-rating button').eq(2).click();
    cy.get('div.v-rating button').eq(0).should('have.class', starredClass);
    cy.get('div.v-rating button').eq(2).should('have.class', starredClass);
    cy.get('.v-tabs a').eq(1).click();
    cy.get('#favourite-movies-table tbody tr').should('have.length', 2);
  });
});
