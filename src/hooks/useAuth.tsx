import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthService, AuthResponse } from '@/services/authService';

interface User {
  id: string;
  email: string;
  profile: {
    username?: string;
    display_name?: string;
    avatar_url?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, username?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const decoded = await AuthService.verifyToken(token);
        if (decoded) {
          const userData = await AuthService.getUserById(decoded.userId);
          if (userData) {
            setUser({
              id: userData._id.toString(),
              email: userData.email,
              profile: userData.profile,
            });
          } else {
            localStorage.removeItem('auth_token');
          }
        } else {
          localStorage.removeItem('auth_token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signUp = async (email: string, password: string, username?: string) => {
    try {
      const response: AuthResponse = await AuthService.register(email, password, username);

      if (response.success && response.user && response.token) {
        localStorage.setItem('auth_token', response.token);
        setUser(response.user);
        return { error: null };
      } else {
        return { error: new Error(response.message || 'Registration failed') };
      }
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response: AuthResponse = await AuthService.login(email, password);

      if (response.success && response.user && response.token) {
        localStorage.setItem('auth_token', response.token);
        setUser(response.user);
        return { error: null };
      } else {
        return { error: new Error(response.message || 'Login failed') };
      }
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    // TODO: Implement password reset functionality
    // For now, return a placeholder
    return { error: new Error('Password reset not implemented yet') };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
