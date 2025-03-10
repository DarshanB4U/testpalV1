import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      config.headers['Authorization'] = `Bearer ${sessionId}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    if (response.data.success) {
      localStorage.setItem('sessionId', response.data.sessionId);
    }
    return response.data;
  },
  
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      localStorage.setItem('sessionId', response.data.sessionId);
    }
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('sessionId');
  }
};

// Question services
export const questionService = {
  getDailyPractice: async () => {
    const response = await api.get('/daily-practice');
    return response.data;
  },
  
  getPreviousYears: async (filters: any = {}) => {
    const response = await api.get('/previous-years', { params: filters });
    return response.data;
  },
  
  getBookQuestions: async (filters: any = {}) => {
    const response = await api.get('/book-questions', { params: filters });
    return response.data;
  }
};

// AI Assistant service
export const aiService = {
  askQuestion: async (query: string) => {
    const response = await api.post('/ai-assistant', { query });
    return response.data;
  }
};

export default api;