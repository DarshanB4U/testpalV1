import axios from "axios";


const API_URL = import.meta.env.VITE_BACKEND_URL;
;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('sessionId');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// Auth services
// Add this method to your authService
export const authService = {
  register: async (name: string, email: string, password: string) => {
    const response = await api.post("/users/signup", {
      name,
      email,
      password,
    });
    if (response.data.msg== "signup sucessful") {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);

    }
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post("/users/login", { email, password });
    if (response.data.msg === "Login successful") {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("sessionId");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },

  getCurrentUserName: () => {
    const userStr = localStorage.getItem("username");
    return userStr ? JSON.parse(userStr) : null;
  },
  getAllTests: async () => {
    const response = await api.get("/users/getAllTests");
    console.log(response);
    return response.data;
  },
  
  getTestById: async (testId) => {
    try {
      const response = await api.get(`users/getTestByID/${testId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching test details:', error);
      throw error;
    }
  },
};

// Question services
export const questionService = {
  genrateTest: async (title: string, testparam: any) => {
    const response = await api.post("/users/genrate", {
      title: title,
      testparam: {
        subject: Number(testparam.subject),
        topics: testparam.topics,
        count: testparam.count,
        difficulty: testparam.difficulty,
        additionalContext: "",
      },
    });
  },

  getRecentTest: async () => {
    const response = await api.get("/users/getRecentTest");

    return response.data;
  },
  getAllTest: async () => {
    const response = await api.get("/uers/getAllTests");
  },
  submitTest: async (testId: number, answers: any, score: number) => {
    const response = await api.post("/users/submitTest", {
      testId: testId,
      userAnswer: answers,
      testScore: score,
    });
    return response.data;
  },
  attemptedQuestions:async()=>{
    const response = await api.get("/users/getQuestionsAttempted");
    console.log(response);
    return response.data;
  }
};

// AI Assistant service
export const aiService = {
  askQuestion: async (query: string) => {
    const response = await api.post("/ai-assistant", { query });
    return response.data;
  },
};

export default api;
