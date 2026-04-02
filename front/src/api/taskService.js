import axios from 'axios';
import { API_BASE_URL, ROUTES } from './routes';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const taskService = {
  getAll: async () => {
    const response = await api.get(ROUTES.listTasks());
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(ROUTES.getTask(id));
    return response.data;
  },
  create: async (data) => {
    const response = await api.post(ROUTES.createTask(), data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(ROUTES.updateTask(id), data);
    return response.data;
  },
  remove: async (id) => {
    await api.delete(ROUTES.deleteTask(id));
  },
};

export default taskService;
