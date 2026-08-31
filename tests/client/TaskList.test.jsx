/**
 * EXERCISE 1 — React unit tests. 15 minutes.
 * fetch is mocked for you. Write the assertions.
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskList from '../../src/TaskList.jsx';

function mockInitialTasks(tasks) {
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => tasks });
}

const SAMPLE = [
  { id: 1, title: 'Buy milk', done: false },
  { id: 2, title: 'Walk dog', done: true },
  { id: 3, title: 'Pay rent', done: false },
];

afterEach(() => jest.resetAllMocks());

describe('TaskList', () => {
  it('renders the tasks returned by the API', async () => {
    mockInitialTasks(SAMPLE);
    render(<TaskList />);
    // TODO: assert all three titles appear
  });

  it('shows how many tasks are still unfinished', async () => {
    mockInitialTasks(SAMPLE);
    render(<TaskList />);
    await screen.findByText('Buy milk');

    // TODO: the counter is screen.getByTestId('counter').
    // Two of the three are unfinished. What does it actually say?
  });

  it('filters to active tasks only', async () => {
    mockInitialTasks(SAMPLE);
    render(<TaskList />);
    await screen.findByText('Buy milk');

    // TODO: click the 'active' filter, assert 'Walk dog' is gone
  });
});
