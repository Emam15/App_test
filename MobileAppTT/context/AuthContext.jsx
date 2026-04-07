import { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginApi, register } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const data = await loginApi(email, password);
      await AsyncStorage.setItem('token', data.token);
      setUser(data.user);
      return { success: true, role: data.user.role };
    } catch (err) {
      return { success: false, message: err.message || 'Login failed' };
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      await register(name, email, password, password);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || 'Signup failed' };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);