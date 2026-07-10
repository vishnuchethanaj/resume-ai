import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  startGoogleAuth: () => void;
  refreshSession: () => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_URL || '';

  const mapServerUserToClient = (serverUser: any): User | null => {
    if (!serverUser) return null;

    return {
      id: serverUser._id || serverUser.id || serverUser.googleId || 'google-user',
      email: serverUser.email || '',
      name: serverUser.displayName || serverUser.name || serverUser.email?.split('@')?.[0] || 'User',
      avatar: serverUser.photo || serverUser.avatar,
      createdAt: serverUser.createdAt ? new Date(serverUser.createdAt) : new Date(),
      plan: 'free',
    };
  };

  const refreshSession = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/user`, {
        credentials: 'include',
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      const sessionUser = mapServerUserToClient(data.user);

      if (sessionUser) {
        setUser(sessionUser);
        localStorage.setItem('user', JSON.stringify(sessionUser));
      }
    } catch {
      // Fall back to local storage below.
    }
  }, [API_BASE]);

  useEffect(() => {
    const init = async () => {
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          localStorage.removeItem('user');
        }
      }

      await refreshSession();
      setIsLoading(false);
    };

    init();
  }, [refreshSession]);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      createdAt: new Date(),
      plan: 'pro',
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const register = async (name: string, email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockUser: User = {
      id: '1',
      email,
      name,
      createdAt: new Date(),
      plan: 'free',
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const startGoogleAuth = () => {
    const authUrl = `${API_BASE}/auth/google`;
    window.location.assign(authUrl);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const forgotPassword = async (_email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        startGoogleAuth,
        refreshSession,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
