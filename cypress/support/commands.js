/**
 * Clears the API's in-memory store so every spec starts from a clean slate.
 * Call this in a beforeEach — do not rely on test execution order.
 */
Cypress.Commands.add('resetTasks', () => {
  cy.request('POST', 'http://localhost:3000/api/test/reset');
});

/** Seeds a task directly through the API — faster and less flaky than the UI. */
Cypress.Commands.add('seedTask', (title) => {
  cy.request('POST', 'http://localhost:3000/api/tasks', { title });
});
