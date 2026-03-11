/**
 * API Routes Configuration
 * All backend endpoint paths are defined here.
 *
 * Base URL is read from environment variable;
 * fallback to localhost for local development.
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const TODOS = '/todos';

export const ROUTES = {
  /** GET    /todos            — list all todos            */
  listTodos: () => `${TODOS}`,

  /** POST   /todos            — create a new todo         */
  createTodo: () => `${TODOS}`,

  /** GET    /todos/:id        — get a single todo by id   */
  getTodo: (id) => `${TODOS}/${id}`,

  /** PUT    /todos/:id        — update a todo by id       */
  updateTodo: (id) => `${TODOS}/${id}`,

  /** DELETE /todos/:id        — delete a todo by id       */
  deleteTodo: (id) => `${TODOS}/${id}`,
};
