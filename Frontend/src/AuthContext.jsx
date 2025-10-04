import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await api.get('/auth/profile');
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
      delete api.defaults.headers.common['Authorization'];
      navigate('/login'); // Redirect to login on profile fetch error
    } finally {
      setIsLoading(false);
    }
  }, [api, navigate]);

  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      await fetchUserProfile(); // Fetch user profile after login
    } catch (error) {
      console.error("Login failed:", error);
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      throw error;
    }
  }, [api, fetchUserProfile, navigate]);

  const register = useCallback(async (name, email, password, role) => {
    try {
      const response = await api.post('/auth/register', { name, email, password, role });
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      await fetchUserProfile(); // Fetch user profile after registration
    } catch (error) {
      console.error("Registration failed:", error);
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      throw error;
    }
  }, [api, fetchUserProfile, navigate]);

  const logout = useCallback(() => {
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      if (api.defaults.headers.common['Authorization']) {
        await fetchUserProfile();
      } else {
        setUser(null);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [fetchUserProfile]);

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};