import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Configure axios base URL
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      console.log('Attempting login with:', { email });
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Set token in localStorage
      localStorage.setItem('token', token);
      
      // Set default authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update user state
      setUser(user);
      console.log('Login successful:', { email, userId: user._id });
      
      return user;
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await axios.post('/api/auth/register', userData);
      const { token, user } = response.data;
      
      // Set token in localStorage
      localStorage.setItem('token', token);
      
      // Set default authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update user state
      setUser(user);
      
      return user;
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const response = await axios.put('/api/auth/profile', profileData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(response.data);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Profile update failed');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 