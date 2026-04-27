// mapp/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await api.get('/auth/me');
          const userData = response.data.user || response.data;
          setUser(userData);
        }
      } catch (e) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      console.log('========== LOGIN ATTEMPT ==========');
      console.log('Email:', email);
      console.log('Password length:', password?.length);
      console.log('API URL:', api.defaults.baseURL);

      const response = await api.post('/auth/login', { email, password });
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      const { token, user } = response.data;







      if (token) {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        return { success: true, role: user.role };
      }
      return { success: false, message: 'Login failed' };
    } catch (error) {
      console.log('========== LOGIN ERROR ==========');
      console.log('Status:', error.response?.status);
      console.log('Message:', error.response?.data?.message);
      console.log('Code:', error.response?.data?.code);
      console.log('Full error:', error.response?.data);


      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Login failed',
      };
    }
  };

  const logout = async () => {
    console.log('[Logout] Clearing user data');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setUser(null);
    router.replace('/(auth)/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);