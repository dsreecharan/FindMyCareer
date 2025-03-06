// API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function for handling API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  return data;
};

// Get token from local storage
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Authentication API
export const authAPI = {
  register: async (userData: { name: string; email: string; password: string; grade: string }) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  verifyToken: async () => {
    const token = getToken();
    if (!token) return null;

    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return handleResponse(response);
    } catch (error) {
      return null;
    }
  },
};

// Career API
export const careerAPI = {
  getAllCareers: async () => {
    const response = await fetch(`${API_URL}/careers`);
    return handleResponse(response);
  },

  getCareerById: async (id: string) => {
    const response = await fetch(`${API_URL}/careers/${id}`);
    return handleResponse(response);
  },

  getCareersByIds: async (ids: string[]) => {
    const response = await fetch(`${API_URL}/careers/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });
    return handleResponse(response);
  },

  searchCareers: async (query: string) => {
    const response = await fetch(`${API_URL}/careers/search/${encodeURIComponent(query)}`);
    return handleResponse(response);
  },
};

// Test API
export const testAPI = {
  getQuestions: async () => {
    const response = await fetch(`${API_URL}/tests/questions`);
    return handleResponse(response);
  },

  submitTest: async (responses: any[]) => {
    const token = getToken();
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_URL}/tests/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ responses }),
    });
    return handleResponse(response);
  },

  getTestHistory: async () => {
    const token = getToken();
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_URL}/tests/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  getTestResultById: async (id: string) => {
    const token = getToken();
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_URL}/tests/result/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    const token = getToken();
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  updateProfile: async (profileData: { name?: string; email?: string; grade?: string }) => {
    const token = getToken();
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    return handleResponse(response);
  },

  saveCareer: async (careerId: string) => {
    const token = getToken();
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_URL}/users/careers/save/${careerId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  removeSavedCareer: async (careerId: string) => {
    const token = getToken();
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_URL}/users/careers/save/${careerId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },

  getSavedCareers: async () => {
    const token = getToken();
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_URL}/users/careers/saved`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(response);
  },
}; 