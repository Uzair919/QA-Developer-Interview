/**
 * EXERCISE 3 — Cypress. 25 minutes.
 * cy.resetTasks() clears the API. cy.seedTask() seeds through it.
 * No cy.wait(2000) — wait on an aliased request or an assertion.
 */
describe('Task Tracker', () => {
  beforeEach(() => {
    cy.resetTasks();
    cy.seedTask('Buy milk');
    cy.seedTask('Walk dog');
    cy.visit('/');
  });

  it('adds a task through the UI', () => {
    cy.intercept('POST', '/api/tasks').as('createTask');
    // TODO: type into input[aria-label="New task"], click Add,
    //       wait on @createTask, assert the new row appears
  });

  it('moves a completed task out of the active filter', () => {
    // TODO: intercept the PATCH toggle, tick the checkbox for 'Buy milk'
    //       (aria-label is `Toggle Buy milk`), wait on the alias,
    //       click the 'active' filter, assert 'Buy milk' is gone
  });

  it('deletes the right task', () => {
    // TODO: delete 'Buy milk' and assert 'Walk dog' is still there
  });
});
