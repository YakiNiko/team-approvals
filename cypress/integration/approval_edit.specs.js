/// <reference types="cypress" />

context("Teams", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
    cy.get('[data-cy=TEAM3]').
    find('[data-cy=edit-button]')
    .click();
  });

  it('User should add a news steps - 2 steps here', () => {
    cy.get("[data-cy=add-step]")
      .click()
      .click()
      .get("[data-cy=approvers-list] > div")
      .get("[data-cy=step1]");
  });
});
