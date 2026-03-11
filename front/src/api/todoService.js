import axios from 'axios';
import { API_BASE_URL, ROUTES } from './routes';

/**
 * Axios instance pre-configured with base URL and default headers.
 * All service methods use this instance.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Todo Service Layer
 * Abstracts all HTTP communication with the backend Todo API.
 */
const todoService = {
  /**
   * Fetch all todos.
   * @returns {Promise<Todo[]>}
   */
  getAll: async () => {
    const response = await api.get(ROUTES.listTodos());
    return response.data;
  },

  /**
   * Fetch a single todo by id.
   * @param {number|string} id
   * @returns {Promise<Todo>}
   */
  getById: async (id) => {
    const response = await api.get(ROUTES.getTodo(id));
    return response.data;
  },

  /**
   * Create a new todo.
   * @param {{ title: string, description?: string }} data
   * @returns {Promise<Todo>}
   */
  create: async (data) => {
    const response = await api.post(ROUTES.createTodo(), data);
    return response.data;
  },

  /**
   * Update an existing todo.
   * @param {number|string} id
   * @param {Partial<Todo>} data
   * @returns {Promise<Todo>}
   */
  update: async (id, data) => {
    const response = await api.put(ROUTES.updateTodo(id), data);
    return response.data;
  },

  /**
   * Delete a todo.
   * @param {number|string} id
   * @returns {Promise<void>}
   */
  remove: async (id) => {
    await api.delete(ROUTES.deleteTodo(id));
  },

  /**
   * Toggle the completed status of a todo.
   * @param {number|string} id
   * @param {boolean} currentStatus
   * @returns {Promise<Todo>}
   */
  toggleComplete: async (id, currentStatus) => {
    const response = await api.put(ROUTES.updateTodo(id), {
      completed: !currentStatus,
    });
    return response.data;
  },
};

export default todoService;
