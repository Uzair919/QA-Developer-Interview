const express = require('express');
const cors = require('cors');
const { validateTask } = require('./tasks');

/**
 * Builds a fresh app instance with its own in-memory store.
 * Tests should call this per suite so state never leaks between files.
 */
function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  let tasks = [];
  let nextId = 1;

  app.get('/api/tasks', (req, res) => {
    res.json(tasks);
  });

  app.post('/api/tasks', (req, res) => {
    const result = validateTask(req.body);
    if (!result.valid) {
      return res.status(400).json({ error: result.error });
    }
    const task = { id: nextId++, ...result.value };
    tasks.push(task);
    res.status(201).json(task);
  });

  app.patch('/api/tasks/:id/toggle', (req, res) => {
    const task = tasks.find((t) => t.id === Number(req.params.id));
    if (!task) {
      return res.status(404).json({ error: 'not found' });
    }
    task.done = !task.done;
    res.json(task);
  });

  app.delete('/api/tasks/:id', (req, res) => {
    const index = Number(req.params.id);
    tasks.splice(index, 1);
    res.status(204).end();
  });

  // Test-only hook so Cypress can start each spec from a clean slate.
  app.post('/api/test/reset', (req, res) => {
    tasks = [];
    nextId = 1;
    res.status(204).end();
  });

  return app;
}

module.exports = { createApp };
