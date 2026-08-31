const MAX_TITLE = 100;

/**
 * Validates the payload for a new task.
 * @param {{title?: unknown}} input
 * @returns {{valid: true, value: {title: string, done: boolean}} | {valid: false, error: string}}
 */
function validateTask(input) {
  if (!input || typeof input.title !== 'string') {
    return { valid: false, error: 'title is required' };
  }
  if (input.title.length > MAX_TITLE) {
    return { valid: false, error: 'title too long' };
  }
  return { valid: true, value: { title: input.title.trim(), done: false } };
}

module.exports = { validateTask, MAX_TITLE };
