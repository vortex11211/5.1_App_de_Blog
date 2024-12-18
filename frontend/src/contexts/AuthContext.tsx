import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService from '../services/authService';

interface AuthContextProps {
  isAuthenticated: boolean;
  userRole: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      setIsAuthenticated(true);
      setUserRole(user.role);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { token, role } = await authService.login(email, password);
      localStorage.setItem('user', JSON.stringify({ token, role }));
      setIsAuthenticated(true);
      setUserRole(role);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = ():AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

