import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User, AppRole } from '@/types/auth';
import axios from 'axios';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  industry?: string;
  companySize?: string;
  domain?: string;
  keywords?: string[];
  sentimentGoals?: string;
  captcha?: string;
  captchaHash?: string;
}

const API_URL = 'http://localhost:5000/api/auth';

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demo
const MOCK_USERS: Record<string, User & { password: string }> = {
  'amazon@senfy.ai': {
    id: '1',
    email: 'amazon@senfy.ai',
    companyName: 'Amazon',
    industry: 'Technology/Retail',
    companySize: '500+',
    role: 'company_admin',
    password: 'senfy123'
  },
  'tesla@senfy.ai': {
    id: '2',
    email: 'tesla@senfy.ai',
    companyName: 'Tesla',
    industry: 'Automotive/Tech',
    companySize: '500+',
    role: 'company_admin',
    password: 'senfy123'
  },
  'starbucks@senfy.ai': {
    id: '3',
    email: 'starbucks@senfy.ai',
    companyName: 'Starbucks',
    industry: 'Food/Beverage',
    companySize: '500+',
    role: 'company_admin',
    password: 'senfy123'
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string, captcha?: string, captchaHash?: string) => {
    try {
      // Try real login first
      const response = await axios.post(`${API_URL}/login`, { email, password, captcha, captchaHash });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(user);
      return { success: true };
    } catch (error: any) {
      // Fallback to mock for demo accounts or if server is down
      const mockUser = MOCK_USERS[email];
      if (mockUser && mockUser.password === password) {
        const token = 'mock-jwt-token';
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        toast.info(`Logged in as ${mockUser.companyName} (Demo Account)`);
        return { success: true };
      }
      
      return { success: false, error: error.response?.data?.message || (error.code === 'ERR_NETWORK' ? 'Server offline - please use demo accounts' : 'Login failed') };
    }
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    try {
      await axios.post(`${API_URL}/signup`, data);
      return { success: true };
    } catch (error: any) {
      // Always allow signup in mock mode for local testing
      if (error.code === 'ERR_NETWORK' || error.response?.status >= 500) {
        toast.info('Sign up successful (Mock Mode)');
        // We'll just return success and let the flow continue
        return { success: true };
      }
      return { success: false, error: error.response?.data?.message || 'Signup failed' };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
