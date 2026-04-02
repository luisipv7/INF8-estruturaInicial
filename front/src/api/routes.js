export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const TASKS = '/tasks';

export const ROUTES = {
  listTasks: () => `${TASKS}`,
  createTask: () => `${TASKS}`,
  getTask: (id) => `${TASKS}/${id}`,
  updateTask: (id) => `${TASKS}/${id}`,
  deleteTask: (id) => `${TASKS}/${id}`,
};
