 import { createContext, useContext, useState, useEffect } from 'react';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { login as apiLogin, getMe } from '../api/auth';
 
 const AuthContext = createContext(null);
 
 export function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
 
   // تحقق من اليوزر عند فتح الأب
   useEffect(() => {
     const loadUser = async () => {
       try {
         const token = await AsyncStorage.getItem('token');
         if (token) {
           const data = await getMe();
           setUser(data.data || data.user || data);
         }
       } catch (e) {
         // لو الـ token انتهى أو فيه مشكلة
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
       const data = await apiLogin(email, password);
       if (data.token) {
         await AsyncStorage.setItem('token', data.token);
         await AsyncStorage.setItem('user', JSON.stringify(data.user));
         setUser(data.user);
         return { success: true, role: data.user.role };
       }
       return { success: false, message: 'Login failed' };
     } catch (e) {
       return {
         success: false,
         message: e.message || 'Login failed',
         code: e.code,
       };
     }
   };
 
   const logout = async () => {
     await AsyncStorage.removeItem('token');
     await AsyncStorage.removeItem('user');
     setUser(null);
   };
 
   return (
     <AuthContext.Provider value={{ user, loading, login, logout }}>
       {children}
     </AuthContext.Provider>
   );
 }
 
 export const useAuth = () => useContext(AuthContext);