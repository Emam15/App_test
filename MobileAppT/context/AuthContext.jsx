import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // هنا هتبعت request لـ API بتاعتك
    // دلوقتي بيرجع dummy data للتجربة
    return { success: true, role: 'student' };
  };

  const signup = async (name, email, password, role) => {
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);