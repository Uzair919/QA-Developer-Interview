# Testing Exercise — Task Tracker

A small React + Node task tracker. **You are not building features. You are testing existing code.**

There are bugs in here. Your tests should fail because of them — leave them failing and tell us what you found. Don't patch the source.

## Start this now, then keep reading

```bash
npm install &      # 2-5 minutes, mostly the Cypress binary
```

When it's done:

```bash
npm test           # Jest — exercises 1 and 2
npm run dev        # app on :5173, API on :3000
npm run cy:open    # Cypress runner — exercise 3, app must be running
```

Each test file already has imports, mocks, and setup written. You fill in assertions. Times are budgets, not targets — if you run over, say so and move on.

---

## Exercise 1 — React unit tests (15 min)

**File:** `tests/client/TaskList.test.jsx`

`src/TaskList.jsx` is the entire UI. On mount it calls `GET /api/tasks`, then renders:

- a text input (`aria-label="New task"`) and an **Add** button
- one row per task, each with a checkbox (`aria-label` is `Toggle <title>`), the title, and a delete button
- three filter buttons — **all**, **active**, **done**
- a counter at the bottom, `data-testid="counter"`, reading `N items left`

A task looks like `{ id, title, done }`.

`fetch` is mocked in the test file, so no server needs to be running. `mockInitialTasks()` controls what the component loads.

Write tests for: the list rendering what the API returned, the counter reflecting how many tasks are unfinished, and the **active** filter hiding completed tasks.

Query by role and accessible name rather than CSS classes.

---

## Exercise 2 — Backend unit tests (15 min)

**File:** `tests/server/tasks.test.js`

`server/tasks.js` exports one pure function and one constant. No HTTP, no server, no mocking:

```js
validateTask({ title: 'Buy milk' })
// -> { valid: true, value: { title: 'Buy milk', done: false } }

validateTask({})
// -> { valid: false, error: 'title is required' }
```

`MAX_TITLE` is the maximum allowed title length.

Write tests for: a valid title, whitespace trimming, rejecting missing and non-string titles, the length boundary in both directions, and a whitespace-only title such as `'   '`.

That last one has no obviously correct answer. Decide what *should* happen, assert it, and if the code disagrees with you, leave the test failing and say why.

---

## Exercise 3 — Cypress (25 min)

**File:** `cypress/e2e/tasks.cy.js`

This runs against the real stack, so `npm run dev` must be going. `server/app.js` is a small Express API over an in-memory store:

| | |
|---|---|
| `GET` | `/api/tasks` |
| `POST` | `/api/tasks` — `{ title }`, 400 if invalid |
| `PATCH` | `/api/tasks/:id/toggle` |
| `DELETE` | `/api/tasks/:id` |
| `POST` | `/api/test/reset` — test-only, clears the store |

Two helpers are in `cypress/support/commands.js`. `cy.resetTasks()` empties the store so specs don't leak into each other, and `cy.seedTask(title)` creates a task through the API — faster and less flaky than driving the UI when the UI isn't what you're testing. Both are already wired into the `beforeEach`.

Write tests for: adding a task through the UI, completing a task and confirming it leaves the **active** filter, and deleting a task while the other one survives.

Wait on aliased requests (`cy.intercept(...).as('x')`, then `cy.wait('@x')`), not fixed sleeps. If Cypress won't install or launch, write the spec anyway and tell us — we read the code either way.

---

## What we're looking for

Tests that would actually fail if someone broke the code. Clean isolation, no test depending on another having run first. And when something fails, a clear note on whether that's your test or their bug.
