/// <reference types="cypress" />

context("Teams", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it('5 teams should be displayed', () => {
    cy.get('[data-cy=teams-container] > div').should('have.length', 5)
  });

  it('User can edit team with TEAM3 id and approval team editor should open', () => {
    cy.get('[data-cy=TEAM3]').
    find('[data-cy=edit-button]')
    .click()
    .get('[data-cy=approval-team-editor]')
  });
});
