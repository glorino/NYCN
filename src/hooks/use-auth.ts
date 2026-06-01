import { useState, useEffect } from 'react';
import { AdminUser, generateToken, verifyToken, validateCredentials } from '@/lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      const verifiedUser = verifyToken(token);
      if (verifiedUser) {
        setUser(verifiedUser);
      } else {
        localStorage.removeItem('admin_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    // Use the secure validateCredentials function (no fallbacks)
    if (validateCredentials({ username, password })) {
      const user: AdminUser = {
        username,
        isAuthenticated: true,
      };
      
      const token = generateToken(user);
      localStorage.setItem('admin_token', token);
      setUser(user);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setUser(null);
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };
};
