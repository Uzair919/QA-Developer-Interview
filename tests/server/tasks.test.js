/**
 * EXERCISE 2 — Backend unit tests. 15 minutes.
 * Pure function, no HTTP.
 */
const { validateTask, MAX_TITLE } = require('../../server/tasks');

describe('validateTask', () => {
  it('accepts a valid title and defaults done to false', () => {
    // TODO
  });

  it('trims surrounding whitespace', () => {
    // TODO
  });

  it('rejects a missing or non-string title', () => {
    // TODO: cover {}, { title: null }, { title: 42 }
  });

  it('accepts exactly MAX_TITLE characters and rejects one more', () => {
    const atLimit = 'a'.repeat(MAX_TITLE);
    const overLimit = 'a'.repeat(MAX_TITLE + 1);
    // TODO
  });

  it('handles a whitespace-only title', () => {
    // TODO: decide what SHOULD happen for '   ', then assert it.
    // If the code disagrees with you, leave this failing and tell us why.
  });
});
