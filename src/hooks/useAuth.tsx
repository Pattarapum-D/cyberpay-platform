import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  getCurrentUser, 
  resetPassword as apiResetPassword,
  saveAuthSession,
  clearAuthSession
} from '@/lib/mongodb';

interface User {
  _id?: string;
  email: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const loadUser = async () => {
      const savedUser = await getCurrentUser();
      setUser(savedUser);
      setLoading(false);
    };
    loadUser();
  }, []);

  const signUp = async (email: string, password: string) => {
    const result = await registerUser(email, password);
    
    if (!result.success || !result.data) {
      return { error: new Error(result.error || 'สมัครสมาชิกไม่สำเร็จ') };
    }

    // Save session and update state
    saveAuthSession(result.data.token, result.data.user);
    setUser(result.data.user);
    
    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const result = await loginUser(email, password);
    
    if (!result.success || !result.data) {
      return { error: new Error(result.error || 'เข้าสู่ระบบไม่สำเร็จ') };
    }

    // Save session and update state
    saveAuthSession(result.data.token, result.data.user);
    setUser(result.data.user);
    
    return { error: null };
  };

  const signInWithGoogle = async () => {
    // Google OAuth needs to be implemented on your backend
    // This would typically redirect to your backend's OAuth endpoint
    return { error: new Error('Google OAuth ยังไม่ได้ตั้งค่า กรุณาติดต่อผู้ดูแลระบบ') };
  };

  const signOut = async () => {
    await logoutUser();
    clearAuthSession();
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    const result = await apiResetPassword(email);
    
    if (!result.success) {
      return { error: new Error(result.error || 'ส่งอีเมลรีเซ็ตรหัสผ่านไม่สำเร็จ') };
    }
    
    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
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
